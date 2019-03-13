import * as React from "react";

import { ITextFieldConfiguration } from "../../utils/contracts";

import "./TextField.css";

export interface IProps {
  fieldConfig: ITextFieldConfiguration;
  onFieldChange: (value: string) => void;
  executeValidation: (
    fieldConfig: ITextFieldConfiguration,
    newInputValue: string
  ) => boolean;
}

export interface IState {
  isValid: boolean;
}

class TextAreaValidator extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isValid: true
    };
  }

  public render() {
    const { fieldType } = this.props.fieldConfig;
    return (
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder={fieldType}
          onChange={this.onValueChange}
        />
        {this.showError()}
      </div>
    );
  }

  private onValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { executeValidation, fieldConfig } = this.props;
    const newInputValue = event.target.value;
    this.setState({ isValid: executeValidation(fieldConfig, newInputValue) });
    this.props.onFieldChange(newInputValue);
  };

  private showError = () => {
    const { fieldConfig } = this.props;
    if (!this.state.isValid) {
      return (
        <div className="error">
          {fieldConfig.fieldType + fieldConfig.message}
        </div>
      );
    }

    return;
  };
}

export default TextAreaValidator;
