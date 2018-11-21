import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import "./App.css";

import Constants from "./Constants";
import Menu from "./menu/Menu";
import ISegment from "./models/Segment";
import Split from "./Split";
import Timer from "./Timer";

library.add(faBars, faTimes);

interface IAppState {
  startTime: number;
  currentTime: number;
  currentSplit: number;
  history: IHistory[];
  isPaused: boolean;
  isTiming: boolean;
  segments: ISegment[];
}

interface IHistory {
  segmentTimes: number[];
}

class App extends React.Component<{}, IAppState> {
  private interval: number;

  constructor(props: any) {
    super(props);
    this.state = {
      currentSplit: 0,
      currentTime: 0,
      history: [{ segmentTimes: [] }],
      isPaused: false,
      isTiming: false,
      segments: [
        { title: "Split Title", pbTime: 5000 },
        { title: "Split Title" },
        { title: "Split Title", pbTime: 15000 },
        { title: "Split Title", pbTime: 20000 },
        { title: "Split Title", pbTime: 25000 },
        { title: "Split Title", pbTime: 30000 },
        { title: "Split Title", pbTime: 35000 },
        { title: "Split Title", pbTime: 40000 },
        { title: "Split Title", pbTime: 45000 },
        { title: "Split Title", pbTime: 50000 },
        { title: "Split Title", pbTime: 55000 },
        { title: "Split Title", pbTime: 60000 },
        { title: "Split Title", pbTime: 65000 },
        { title: "Split Title", pbTime: 70000 }
      ],
      startTime: Date.now()
    };
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    let clickAction = this.startTimer;
    if (this.state.isTiming) {
      clickAction = this.splitTimer;
    }

    let lastControlText = "Start";
    let lastControlAction = this.startTimer;
    if (this.state.isTiming) {
      if (this.state.isPaused) {
        lastControlText = "Resume";
        lastControlAction = this.resumeTimer;
      } else {
        lastControlText = "Pause";
        lastControlAction = this.pauseTimer;
      }
    }

    const splits: JSX.Element[] = [];
    for (let i = 0; i < this.state.segments.length; i++) {
      splits.push(
        <Split
          key={i}
          segment={this.state.segments[i]}
          currentTime={this.state.currentTime}
          isCurrentSplit={this.state.isTiming && this.state.currentSplit === i}
          segmentTime={
            this.state.history[this.state.currentSplit].segmentTimes[i]
          }
        />
      );
    }

    return (
      <div className="App">
        <div id="controls" className="controls">
          <button className="controls-button ml-0" onClick={this.undoSegment}>
            Undo
          </button>
          <button className="controls-button" onClick={this.skipSegment}>
            Skip
          </button>
          <button className="controls-button" onClick={this.resetTimer}>
            Reset
          </button>
          <button className="controls-button mr-0" onClick={lastControlAction}>
            {lastControlText}
          </button>
        </div>
        <div className="header">
          <Menu />
          <span className="title">Title</span>
          <div onClick={clickAction}>
            <Timer time={this.state.currentTime} />
          </div>
        </div>
        <div className="splits" onClick={clickAction}>
          {splits}
        </div>
      </div>
    );
  }

  private startTimer = () => {
    clearInterval(this.interval);
    this.setState({
      currentSplit: 0,
      history: [{ segmentTimes: [] }],
      isPaused: false,
      isTiming: true,
      startTime: Date.now()
    });
    this.createInterval();

    this.scrollToCurrentSplit();
  };

  private splitTimer = () => {
    if (this.state.isPaused || !this.state.isTiming) {
      return;
    }

    this.setSegmentTime(this.state.currentTime);

    // Stop the timer if this was the last split
    if (this.state.currentSplit >= this.state.segments.length - 1) {
      clearInterval(this.interval);
      this.setState({
        isTiming: false
      });
    } else {
      this.setState({
        currentSplit: this.state.currentSplit + 1
      });
    }

    this.scrollToCurrentSplit();
  };

  private pauseTimer = () => {
    clearInterval(this.interval);
    this.setState({
      isPaused: true
    });
  };

  private resumeTimer = () => {
    const now = Date.now();
    this.setState({
      isPaused: false,
      startTime: now - this.state.currentTime
    });
    this.createInterval();
  };

  private resetTimer = () => {
    clearInterval(this.interval);
    this.setState({
      currentSplit: 0,
      currentTime: 0,
      history: [{ segmentTimes: [] }],
      isTiming: false
    });
  };

  private undoSegment = () => {
    if (this.state.currentSplit === 0 || !this.state.isTiming) {
      return;
    }

    this.setState({
      currentSplit: this.state.currentSplit - 1,
      history: this.state.history.slice(0, this.state.currentSplit)
    });
  };

  private skipSegment = () => {
    if (!this.state.isTiming) {
      return;
    }

    this.setSegmentTime(Constants.SKIPPED);

    this.setState({
      currentSplit: this.state.currentSplit + 1
    });
  };

  private createInterval = () => {
    this.interval = setInterval(() => {
      this.setState({
        currentTime: Date.now() - this.state.startTime
      });
    });
  };

  private setSegmentTime = (time: number) => {
    const currentSplit = this.state.currentSplit;
    const segmentTimes = this.state.history[currentSplit].segmentTimes.concat([
      time
    ]);
    this.setState({
      history: this.state.history.concat([{ segmentTimes }])
    });
  };

  private scrollToCurrentSplit = () => {
    const controls = document.getElementById("controls");
    if (controls) {
      const controlsHeight = controls.getBoundingClientRect().height;
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top:
          (this.state.currentSplit - 1) * Constants.SPLITS_HEIGHT -
          Constants.SPLITS_MARGIN -
          controlsHeight
      });
    }
  };
}

export default App;
