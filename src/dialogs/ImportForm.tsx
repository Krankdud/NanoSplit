import * as React from "react";
import Constants from "src/Constants";
import parseLiveSplit from "../livesplit/Parser";
import IRun from "../models/Run";
import "./ImportForm.css";

interface IImportFormProps {
  onImport: (run: IRun) => void;
}

interface IImportFormState {
  errorOcurred: boolean;
}

class ImportForm extends React.Component<IImportFormProps, IImportFormState> {
  private fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: IImportFormProps) {
    super(props);
    this.state = {
      errorOcurred: false
    };
    this.fileInput = React.createRef<HTMLInputElement>();
  }

  public render() {
    return (
      <div>
        {this.state.errorOcurred && (
          <div className="import-error">
            An error occurred while reading the file. Please try again.
          </div>
        )}
        <div className="import-description">
          Import splits from <a href="https://www.livesplit.org">LiveSplit</a>
        </div>
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
          try {
            const liveSplitRun = parseLiveSplit(result);
            const run: IRun = {
              category: liveSplitRun.category || "",
              delay: liveSplitRun.offset
                ? this.convertLiveSplitTimeToMS(liveSplitRun.offset)
                : 0,
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
          } catch (error) {
            this.setState({ errorOcurred: true });
          }
        }
      };

      fileReader.onloadend = (e: ProgressEvent) => {
        if (fileReader.error) {
          this.setState({ errorOcurred: true });
        }
      };
    }
  };

  private convertLiveSplitTimeToMS = (time: string | null) => {
    if (!time) {
      return Constants.SKIPPED;
    }
    const splittedTime = time.split(":");
    const hours = Math.abs(parseInt(splittedTime[0], 10));
    const minutes = parseInt(splittedTime[1], 10);
    const splittedSeconds = splittedTime[2].split(".");
    const seconds = parseInt(splittedSeconds[0], 10);
    const milliseconds =
      splittedSeconds.length > 1
        ? parseInt(splittedSeconds[1].slice(0, 3), 10)
        : 0;
    return (
      milliseconds +
      seconds * 1000 +
      minutes * 60 * 1000 +
      hours * 60 * 60 * 1000
    );
  };
}

export default ImportForm;
