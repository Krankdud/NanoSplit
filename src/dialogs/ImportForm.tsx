import * as React from "react";
import parseLiveSplit from "../livesplit/Parser";
import IRun from "../models/Run";

interface IImportFormProps {
  onImport: (run: IRun) => void;
}

class ImportForm extends React.Component<IImportFormProps> {
  private fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: IImportFormProps) {
    super(props);
    this.fileInput = React.createRef<HTMLInputElement>();
  }

  public render() {
    return (
      <div>
        Import splits from <a href="https://www.livesplit.org">LiveSplit</a>
        <form onSubmit={this.handleSubmit}>
          <input type="file" accept=".lss" ref={this.fileInput} />
          <input type="submit" value="Import" />
        </form>
      </div>
    );
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (this.fileInput.current && this.fileInput.current.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(this.fileInput.current.files[0]);
      fileReader.onload = (e: ProgressEvent) => {
        const result = fileReader.result;
        if (typeof result === "string") {
          const liveSplitRun = parseLiveSplit(result);
          const run: IRun = {
            category: liveSplitRun.category || "",
            game: liveSplitRun.game || "",
            segments: []
          };
          liveSplitRun.segments.forEach(segment => {
            run.segments.push({
              bestTime: this.convertLiveSplitTimeToMS(
                segment.bestSegmentTime.realTime
              ),
              id: "",
              pbTime: this.convertLiveSplitTimeToMS(
                segment.splitTimes[0].realTime
              ),
              title: segment.name || ""
            });
          });
          this.props.onImport(run);
        }
      };
    }
  };

  private convertLiveSplitTimeToMS = (time: string | null) => {
    if (!time) {
      return -1;
    }
    const splittedTime = time.split(":");
    const hours = parseInt(splittedTime[0], 10);
    const minutes = parseInt(splittedTime[1], 10);
    const splittedSeconds = splittedTime[2].split(".");
    const seconds = parseInt(splittedSeconds[0], 10);
    const milliseconds = parseInt(splittedSeconds[0].slice(0, 3), 10);
    return (
      milliseconds +
      seconds * 1000 +
      minutes * 60 * 1000 +
      hours * 60 * 60 * 1000
    );
  };
}

export default ImportForm;
