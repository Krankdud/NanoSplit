import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Constants from "./Constants";
import Dialog from "./dialog/Dialog";
import { DialogType } from "./dialog/DialogOptions";
import EditSplits from "./dialogs/EditSplits";
import Menu from "./menu/Menu";
import IDialogData from "./models/DialogData";
import IRun from "./models/Run";
import Split from "./Split";
import Timer from "./Timer";

library.add(faBars, faSort, faTimes);

interface IAppState {
  currentTime: number;
  currentSplit: number;
  dialog: IDialogData;
  history: IHistory[];
  isPaused: boolean;
  isTiming: boolean;
  run: IRun;
  showDialog: boolean;
  showMenu: boolean;
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
      dialog: {
        options: {
          showCloseButton: true,
          title: "",
          type: DialogType.Modal
        }
      },
      history: [{ segmentTimes: [] }],
      isPaused: false,
      isTiming: false,
      run: {
        category: "Any%",
        game: "Super Metroid",
        segments: [
          { id: "", title: "0", pbTime: 5000 },
          { id: "", title: "1" },
          { id: "", title: "2", pbTime: 15000 },
          { id: "", title: "3", pbTime: 20000 },
          { id: "", title: "4", pbTime: 25000 },
          { id: "", title: "5", pbTime: 30000 },
          { id: "", title: "6", pbTime: 35000 },
          { id: "", title: "7", pbTime: 40000 },
          { id: "", title: "8", pbTime: 45000 },
          { id: "", title: "9", pbTime: 50000 },
          { id: "", title: "10", pbTime: 55000 },
          { id: "", title: "11", pbTime: 60000 },
          { id: "", title: "12", pbTime: 65000 },
          { id: "", title: "13", pbTime: 70000 }
        ]
      },
      showDialog: false,
      showMenu: false,
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

    let title: JSX.Element;
    if (this.state.run.game === "" && this.state.run.category === "") {
      title = <div className="title title-large">NanoSplit</div>;
    } else if (this.state.run.game === "") {
      title = (
        <div className="title title-large">{this.state.run.category}</div>
      );
    } else if (this.state.run.category === "") {
      title = <div className="title title-large">{this.state.run.game}</div>;
    } else {
      title = (
        <div className="title">
          {this.state.run.game}
          <br />
          {this.state.run.category}
        </div>
      );
    }

    return (
      <div className="App">
        <div className="clickable" onClick={clickAction} />
        <div className="header">
          <div className="title-bar">
            <div className="sidenav-menu" onClick={this.openMenu}>
              <FontAwesomeIcon icon="bars" />
            </div>
            {title}
          </div>
          <div onClick={clickAction}>
            <Timer time={this.state.currentTime} />
          </div>
        </div>
        <div className="splits" id="splits" onClick={clickAction}>
          {splits}
        </div>
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
        <Menu isOpen={this.state.showMenu} closeCallback={this.closeMenu}>
          <div className="sidenav-item" onClick={this.openNewSplits}>
            New splits
          </div>
          <div className="sidenav-item" onClick={this.openEditSplits}>
            Edit splits
          </div>
          <div className="sidenav-item">Import</div>
          <div className="sidenav-item">Export</div>
          <div className="sidenav-item">Settings</div>
        </Menu>
        <Dialog
          isOpen={this.state.showDialog}
          onClose={this.closeDialog}
          options={this.state.dialog.options}
        >
          {this.state.dialog.contents}
        </Dialog>
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
        (numOfSplits - currentSplit - 1) * Constants.SPLIT_HEIGHT;
      const target = bottom - windowHeight + controlsHeight;
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: target
      });
    }
  };

  private newSplits = () => {
    const run: IRun = {
      category: "",
      game: "",
      segments: []
    };
    this.setState({ run, showDialog: false, showMenu: false });
  };

  private openNewSplits = () => {
    this.setState({
      dialog: {
        contents: (
          <div>
            Are you sure you want to create new splits? Your previous splits
            will be erased.
          </div>
        ),
        options: {
          onCancel: this.closeDialog,
          onConfirm: this.newSplits,
          showCancelButton: true,
          showCloseButton: false,
          showConfirmButton: true,
          title: "Create new splits",
          type: DialogType.Modal
        }
      },
      showDialog: true,
      showMenu: false
    });
  };

  private openEditSplits = () => {
    this.setState({
      dialog: {
        contents: (
          <EditSplits run={this.state.run} onConfirm={this.confirmEditSplits} />
        ),
        options: {
          showCloseButton: true,
          title: "Edit splits",
          type: DialogType.Fullscreen
        }
      },
      showDialog: true,
      showMenu: false
    });
  };

  private confirmEditSplits = (run: IRun) => {
    this.setState({ run });
    this.closeDialog();
  };

  private closeDialog = () => {
    this.setState({ showDialog: false });
    window.setTimeout(() => {
      this.setState({
        dialog: {
          options: {
            showCloseButton: true,
            title: "",
            type: DialogType.Modal
          }
        }
      });
    }, Constants.DIALOG_CLOSE_TIME_IN_MS);
  };

  private openMenu = () => {
    this.setState({ showMenu: true });
  };

  private closeMenu = () => {
    this.setState({ showMenu: false });
  };
}

export default App;
