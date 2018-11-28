import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./EditSplits.css";

class EditSplits extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <form>
          <div>
            <label>
              Game <input type="text" name="game" />
            </label>
          </div>
          <div>
            <label>
              Category <input type="text" name="category" />
            </label>
          </div>
          <div>
            <div>Splits</div>
            <div className="editsplits-split">
              <input type="text" name="split-0" />
              <div className="editsplits-split-sort">
                <FontAwesomeIcon icon="sort" />
              </div>
            </div>
            <div className="editsplits-split">
              <input type="text" name="split-1" />
              <div className="editsplits-split-sort">
                <FontAwesomeIcon icon="sort" />
              </div>
            </div>
            <div className="editsplits-split">
              <input type="text" name="split-2" />
              <div className="editsplits-split-sort">
                <FontAwesomeIcon icon="sort" />
              </div>
            </div>
          </div>
          <div className="editsplits-buttons">
            <button className="editsplits-buttons-button">Remove</button>
            <button className="editsplits-buttons-button">Insert</button>
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
}

export default EditSplits;
