import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import IRun from "src/models/Run";
import ISegment from "src/models/Segment";
import "./EditSplits.css";

interface IEditSplitsProps {
  onConfirm: (segments: IRun) => void;
  run: IRun;
}

interface IEditSplitsState {
  category: string;
  delay: number;
  game: string;
  segments: ISegment[];
  selectedIndex?: number;
}

class EditSplits extends React.Component<IEditSplitsProps, IEditSplitsState> {
  private lastId: number = 0;

  constructor(props: IEditSplitsProps) {
    super(props);

    const segments = props.run.segments.slice();
    for (let i = 0; i < segments.length; i++) {
      segments[i].id = "split-" + i;
      this.lastId = i;
    }
    this.state = {
      category: this.props.run.category,
      delay: this.props.run.delay,
      game: this.props.run.game,
      segments
    };
  }

  public render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Game{" "}
              <input
                type="text"
                name="game"
                defaultValue={this.state.game}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Category{" "}
              <input
                type="text"
                name="category"
                defaultValue={this.state.category}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Start delay (seconds){" "}
              <input
                type="text"
                name="delay"
                defaultValue="0"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <div>Splits</div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {this.makeDroppable()}
            </DragDropContext>
          </div>
          <div className="editsplits-buttons">
            <span className="editsplits-buttons-button" onClick={this.onRemove}>
              Remove
            </span>
            <span className="editsplits-buttons-button" onClick={this.onInsert}>
              Insert
            </span>
            <input
              className="editsplits-buttons-button"
              type="submit"
              value="Done"
            />
          </div>
        </form>
      </div>
    );
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onConfirm({
      category: this.state.category,
      delay: this.state.delay * 1000,
      game: this.state.game,
      segments: this.state.segments.slice()
    });
  };

  private handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const name = target.name;
    const value = target.value;

    if (name === "game") {
      this.setState({ game: value });
    } else if (name === "category") {
      this.setState({ category: value });
    } else if (name === "delay") {
      this.setState({ delay: parseInt(value, 10) });
    } else {
      this.state.segments.forEach(segment => {
        if (segment.id === name) {
          segment.title = value;
        }
      });
    }
  };

  private onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const segments = this.state.segments.slice();
    const [removed] = segments.splice(result.source.index, 1);
    segments.splice(result.destination.index, 0, removed);

    this.setState({ segments });

    if (result.source.index === this.state.selectedIndex) {
      this.setState({ selectedIndex: result.destination.index });
    }
  };

  private onInsert = () => {
    this.lastId++;
    const segment: ISegment = {
      id: "split-" + this.lastId,
      title: ""
    };

    const segments = this.state.segments.slice();
    if (!this.state.selectedIndex) {
      segments.push(segment);
    } else {
      segments.splice(this.state.selectedIndex, 0, segment);
    }

    this.setState({ segments });
  };

  private onRemove = () => {
    if (!this.state.selectedIndex) {
      return;
    }

    const segments = this.state.segments.slice();
    segments.splice(this.state.selectedIndex, 1);
    this.setState({
      segments,
      selectedIndex: undefined
    });
  };

  private makeDroppable = () => {
    const draggables: JSX.Element[] = [];
    for (let i = 0; i < this.state.segments.length; i++) {
      const segmentId = this.state.segments[i].id;

      let className = "editsplits-split";
      if (this.state.selectedIndex === i) {
        className += " editsplits-split-selected";
      }

      draggables.push(
        <Draggable key={segmentId} draggableId={segmentId} index={i}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={className}
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() => {
                this.setState({ selectedIndex: i });
              }}
            >
              <input
                type="text"
                name={segmentId}
                defaultValue={this.state.segments[i].title}
                onChange={this.handleInputChange}
              />
              <div className="editsplits-split-sort">
                <FontAwesomeIcon icon="sort" />
              </div>
            </div>
          )}
        </Draggable>
      );
    }

    return (
      <Droppable droppableId="editSplitsDroppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {draggables}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };
}

export default EditSplits;
