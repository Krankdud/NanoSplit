import * as React from "react";
import "./HelpDialog.css";

class HelpDialog extends React.Component {
  public render() {
    return (
      <div className="help-content">
        <h2>How do I export on iOS?</h2>
        <p>
          Due to a bug on iOS, downloading the splits directly isn't supported.
          Here's the workaround:
        </p>
        <ol>
          <li>Copy the contents in the text box of the export dialog</li>
          <li>Paste the contents into the Notes app on your device</li>
          <li>Hit the Share button and select Save to Files</li>
          <li>Choose a location for the file and save the file</li>
        </ol>
        <h2>Is NanoSplit open source?</h2>
        <p>
          Yes! The code can be found on{" "}
          <a href="https://github.com/krankdud/nanosplit">GitHub</a>.
        </p>
        <h2>I need additional help / found a bug!</h2>
        <p>
          Contact <a href="https://twitter.com/krankdud">@Krankdud</a> on
          Twitter or make an issue on{" "}
          <a href="https://github.com/krankdud/nanosplit">GitHub</a>!
        </p>
      </div>
    );
  }
}

export default HelpDialog;
