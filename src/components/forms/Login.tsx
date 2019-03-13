import * as React from "react";

import { connect } from "react-redux";

import { loginUser } from "../../actions/userActions";
import { ITextFieldConfiguration, IUser } from "../../utils/contracts";
import TextField from "../fields/TextValidator";

import "./CommonForm.css";

export interface IProps {
  loginUser: (user: IUser) => void;
}

export interface IState {
  usernameConfig: ITextFieldConfiguration;
  passwordConfig: ITextFieldConfiguration;
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      usernameConfig: {
        fieldType: "username",
        message: "'s length must be at least 5 characters - at least 1 letter.",
        pattern: /^(?=.*[a-zA-Z])(?=.{5,})/,
        value: ""
      },
      passwordConfig: {
        fieldType: "password",
        message: "'s length must be at least 8 characters - letters and digits",
        pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/,
        value: ""
      }
    };
  }

  public render() {
    const { usernameConfig, passwordConfig } = this.state;
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Login</h3>
            <form onSubmit={this.submitHandler}>
              <TextField
                fieldConfig={usernameConfig}
                executeValidation={this.validateField}
                onFieldChange={this.usernameHandler}
              />
              <TextField
                fieldConfig={passwordConfig}
                executeValidation={this.validateField}
                onFieldChange={this.passwordHandler}
              />
              <div className="form-group">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Login"
                  disabled={!this.AllFieldsAreValid()}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Fields Handlers
  private usernameHandler = (newValue: string) => {
    const temp = { ...this.state.usernameConfig };
    temp.value = newValue;
    this.setState({ usernameConfig: temp });
  };
  private passwordHandler = (newValue: string) => {
    const temp = { ...this.state.passwordConfig };
    temp.value = newValue;
    this.setState({ passwordConfig: temp });
  };
  private submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputUser: IUser = {
      password: this.state.passwordConfig.value,
      username: this.state.usernameConfig.value
    };
    this.props.loginUser(inputUser);
  };

  // Validation
  private validateField = (
    configuration: ITextFieldConfiguration,
    newInputValue: string
  ) => {
    const { pattern } = configuration;
    return pattern ? pattern.test(newInputValue) : false;
  };
  private AllFieldsAreValid = () => {
    const { usernameConfig, passwordConfig } = this.state;
    return (
      this.validateField(usernameConfig, usernameConfig.value) &&
      this.validateField(passwordConfig, passwordConfig.value)
    );
  };
}

// Mapping
const mapActionsToProps = {
  loginUser
};

export default connect(
  undefined,
  mapActionsToProps
)(Login);
