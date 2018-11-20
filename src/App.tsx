import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import "./App.css";

import Menu from "./menu/Menu";
import ISegment from "./models/Segment";
import Split from "./Split";
import Timer from "./Timer";

library.add(faBars, faTimes);

interface IAppState {
  startTime: number;
  currentTime: number;
  currentSplit: number;
  isPaused: boolean;
  isTiming: boolean;
  segments: ISegment[];
}

class App extends React.Component<{}, IAppState> {
  private interval: number;

  constructor(props: any) {
    super(props);
    this.state = {
      currentSplit: 0,
      currentTime: 0,
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
        />
      );
    }

    return (
      <div className="App">
        <div className="controls">
          <button className="controls-button ml-0">Undo</button>
          <button className="controls-button">Skip</button>
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
      isPaused: false,
      isTiming: true,
      startTime: Date.now()
    });
    this.createInterval();
  };

  private splitTimer = () => {
    if (this.state.isPaused) {
      return;
    }

    if (this.state.currentSplit === this.state.segments.length - 1) {
      clearInterval(this.interval);
      this.setState({
        isTiming: false
      });
    } else {
      this.setState({
        currentSplit: this.state.currentSplit + 1
      });
    }
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
      currentTime: 0,
      isTiming: false
    });
  };

  private createInterval = () => {
    this.interval = setInterval(() => {
      this.setState({
        currentTime: Date.now() - this.state.startTime
      });
    });
  };
}

export default App;
