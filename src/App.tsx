import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import "./App.css";

import Constants from "./Constants";
import Dialog from "./dialog/Dialog";
import Menu from "./menu/Menu";
import IRun from "./models/Run";
import Split from "./Split";
import Timer from "./Timer";

library.add(faBars, faTimes);

interface IAppState {
  currentTime: number;
  currentSplit: number;
  history: IHistory[];
  isPaused: boolean;
  isTiming: boolean;
  run: IRun;
  showDialog: boolean;
  startTime: number;
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
      run: {
        category: "Any%",
        game: "Super Metroid",
        segments: [
          { title: "0", pbTime: 5000 },
          { title: "1" },
          { title: "2", pbTime: 15000 },
          { title: "3", pbTime: 20000 },
          { title: "4", pbTime: 25000 },
          { title: "5", pbTime: 30000 },
          { title: "6", pbTime: 35000 },
          { title: "7", pbTime: 40000 },
          { title: "8", pbTime: 45000 },
          { title: "9", pbTime: 50000 },
          { title: "10", pbTime: 55000 },
          { title: "11", pbTime: 60000 },
          { title: "12", pbTime: 65000 },
          { title: "13", pbTime: 70000 }
        ]
      },
      showDialog: false,
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
    for (let i = 0; i < this.state.run.segments.length; i++) {
      splits.push(
        <Split
          key={i}
          segment={this.state.run.segments[i]}
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
          <div className="title-bar">
            <Menu>
              <div className="sidenav-item">New splits</div>
              <div className="sidenav-item">Edit splits</div>
              <div className="sidenav-item">Import</div>
              <div className="sidenav-item">Export</div>
              <div className="sidenav-item">Settings</div>
            </Menu>
            <div className="title">
              {this.state.run.game}
              <br />
              {this.state.run.category}
            </div>
          </div>
          <div onClick={clickAction}>
            <Timer time={this.state.currentTime} />
          </div>
        </div>
        <div className="splits" id="splits" onClick={clickAction}>
          {splits}
        </div>
        <Dialog isOpen={this.state.showDialog} onClose={this.closeModal} />
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

    this.scrollToSplit(0);
  };

  private splitTimer = () => {
    if (this.state.isPaused || !this.state.isTiming) {
      return;
    }

    let currentSplit = this.state.currentSplit;
    this.setSegmentTime(this.state.currentTime);

    // Stop the timer if this was the last split
    if (this.state.currentSplit >= this.state.run.segments.length - 1) {
      clearInterval(this.interval);
      this.setState({
        isTiming: false
      });
    } else {
      currentSplit += 1;
      this.setState({ currentSplit });
    }

    this.scrollToSplit(currentSplit);
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

  private scrollToSplit = (currentSplit: number) => {
    if (document.documentElement === null) {
      return;
    }
    const windowHeight = document.documentElement.clientHeight;
    const controls = document.getElementById("controls");
    const splits = document.getElementById("splits");
    if (controls && splits) {
      const controlsHeight = controls.getBoundingClientRect().height;
      const splitsHeight = splits.getBoundingClientRect().height;
      const numOfSplits = this.state.run.segments.length;
      const bottom =
        Constants.SPLITS_MARGIN +
        splitsHeight -
        (numOfSplits - currentSplit - 1) * Constants.SPLITS_HEIGHT;
      const target = bottom - windowHeight + controlsHeight;
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: target
      });
    }
  };

  private closeModal = () => {
    this.setState({ showDialog: false });
  };
}

export default App;
