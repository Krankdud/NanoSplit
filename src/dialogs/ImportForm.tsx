import * as React from "react";

class ImportForm extends React.Component {
  public render() {
    return (
      <div>
        Import splits from <a href="https://www.livesplit.org">LiveSplit</a>
        <form>
          <input type="file" accept=".lss" />
          <input type="submit" value="Import" />
        </form>
      </div>
    );
  }
}

export default ImportForm;
