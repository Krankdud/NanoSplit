import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import "./App.css";

import Menu from "./menu/Menu";
import Split from "./Split";
import Timer from "./Timer";

library.add(faBars, faTimes);

interface IAppState {
  startTime: number;
  currentTime: number;
  isPaused: boolean;
  isTiming: boolean;
  splits: number[];
}

class App extends React.Component<{}, IAppState> {
  private interval: number;

  constructor(props: any) {
    super(props);
    this.state = {
      currentTime: 0,
      isPaused: false,
      isTiming: false,
      splits: [
        5000,
        10000,
        15000,
        20000,
        25000,
        30000,
        35000,
        40000,
        45000,
        50000,
        55000,
        60000
      ],
      startTime: Date.now()
    };
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    let clickAction;
    if (!this.state.isTiming) {
      clickAction = this.startTimer;
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
    for (const split of this.state.splits) {
      splits.push(<Split name="Split title" time={split} />);
    }

    return (
      <div className="App">
        <div>
          <Menu />
          <span className="title">Title</span>
        </div>
        <div onClick={clickAction}>
          <Timer time={this.state.currentTime} />
          {splits}
        </div>
        <div className="controls">
          <button className="controls-button">Undo</button>
          <button className="controls-button">Skip</button>
          <button className="controls-button" onClick={this.resetTimer}>
            Reset
          </button>
          <button className="controls-button" onClick={lastControlAction}>
            {lastControlText}
          </button>
        </div>
      </div>
    );
  }

  private startTimer = () => {
    clearInterval(this.interval);
    this.setState({
      isPaused: false,
      isTiming: true,
      startTime: Date.now()
    });
    this.createInterval();
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
