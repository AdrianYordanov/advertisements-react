import * as React from "react";

import "./MiniError.css";

export interface IProps {
  invalidMessage: string;
  isValid: boolean;
}

class FieldValidator extends React.Component<IProps> {
  public render() {
    return (
      <div className="form-group">
        {this.props.children}
        {this.showError()}
      </div>
    );
  }

  private showError = () => {
    const { invalidMessage, isValid } = this.props;
    return !isValid ? <div className="error">{invalidMessage}</div> : undefined;
  };
}

export default FieldValidator;
