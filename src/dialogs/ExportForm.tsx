import * as React from "react";
import exportLiveSplitToXML from "src/livesplit/Export";
import IRun from "src/models/Run";
import "./ExportForm.css";

interface IExportFormProps {
  run: IRun;
}

class ExportForm extends React.Component<IExportFormProps> {
  private textArea: React.RefObject<HTMLTextAreaElement>;
  private runXML: string;
  private exportObjectURL: string | null = null;

  constructor(props: IExportFormProps) {
    super(props);
    this.textArea = React.createRef<HTMLTextAreaElement>();

    this.createXML();
    this.createObjectURL();
  }

  public componentDidMount() {
    if (this.textArea.current) {
      this.textArea.current.value = this.runXML;
    }
  }

  public componentWillUnmount() {
    if (this.exportObjectURL) {
      window.URL.revokeObjectURL(this.exportObjectURL);
    }
  }

  public render() {
    return (
      <div>
        <div className="export-warning">
          Do not overwrite your old LiveSplit splits. You may lose additional
          data.
        </div>
        <div className="export-button" onClick={this.onDownload}>
          Download
        </div>
        <div className="export-ios">
          iOS users: Copy and paste the text below to a new file.
        </div>
        <textarea className="export-textarea" ref={this.textArea} />
      </div>
    );
  }

  private onDownload = () => {
    if (!this.exportObjectURL) {
      return;
    }

    const link = document.createElement("a");
    link.setAttribute("download", "splits.lss");
    link.href = this.exportObjectURL;
    document.body.appendChild(link);

    window.requestAnimationFrame(() => {
      const event = new MouseEvent("click");
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
  };

  private createXML = () => {
    const run = this.props.run;
    const liveSplitSegments: ILiveSplitSegment[] = [];
    run.segments.forEach(segment => {
      liveSplitSegments.push({
        bestSegmentTime: {
          realTime: segment.bestTime
            ? timeToLiveSplitTime(segment.bestTime)
            : null
        },
        name: segment.title,
        splitTimes: [
          {
            realTime: segment.pbTime
              ? timeToLiveSplitTime(segment.pbTime)
              : null
          }
        ]
      });
    });

    const liveSplitRun: ILiveSplitRun = {
      category: run.category,
      game: run.game,
      offset: delayToOffset(run.delay),
      segments: liveSplitSegments
    };
    this.runXML = exportLiveSplitToXML(liveSplitRun);
  };

  private createObjectURL = () => {
    const blob = new Blob([this.runXML], { type: "application/xml" });

    if (this.exportObjectURL) {
      window.URL.revokeObjectURL(this.exportObjectURL);
    }
    this.exportObjectURL = window.URL.createObjectURL(blob);
  };
}

function delayToOffset(delay: number): string {
  if (delay === 0) {
    return "00:00:00";
  }
  return "-" + timeToLiveSplitTime(delay, false);
}

function timeToLiveSplitTime(time: number, includeMS: boolean = true): string {
  const milliseconds = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 360000);
  return (
    "" +
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    (includeMS
      ? "." +
        (milliseconds < 10
          ? "00" + milliseconds
          : milliseconds < 100
          ? "0" + milliseconds
          : milliseconds)
      : "")
  );
}

export default ExportForm;
