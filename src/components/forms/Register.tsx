import * as React from "react";

// Components
import TextField from "../fields/TextValidator";

// Contracts
import { ITextFieldConfiguration, IUser } from "../../utils/Contracts";

// CSS
import "./CommonForm.css";

export interface IProps {
  registerUser: (inputUser: IUser) => void;
}

export interface IState {
  usernameConfig: ITextFieldConfiguration;
  passwordConfig: ITextFieldConfiguration;
  confirmPasswordConfig: ITextFieldConfiguration;
}

class Register extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      confirmPasswordConfig: {
        fieldType: "confirm password",
        message: " must to equal to the password above.",
        pattern: undefined,
        value: ""
      },
      passwordConfig: {
        fieldType: "password",
        message: "'s length must be at least 8 characters - letters and digits",
        pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/,
        value: ""
      },
      usernameConfig: {
        fieldType: "username",
        message: "'s length must be at least 5 characters - at least 1 letter.",
        pattern: /^(?=.*[a-zA-Z])(?=.{5,})/,
        value: ""
      }
    };
  }

  public render() {
    const {
      usernameConfig,
      passwordConfig,
      confirmPasswordConfig
    } = this.state;
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Register</h3>
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
              <TextField
                fieldConfig={confirmPasswordConfig}
                executeValidation={this.validateField}
                onFieldChange={this.confirmPasswordHandler}
              />
              <div className="form-group">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Register"
                  disabled={!this.AllFieldsAreValid()}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Handlers
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
  private confirmPasswordHandler = (newValue: string) => {
    const temp = { ...this.state.confirmPasswordConfig };
    temp.value = newValue;
    this.setState({ confirmPasswordConfig: temp });
  };
  private submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputUser = {
      password: this.state.passwordConfig.value,
      username: this.state.usernameConfig.value
    };
    this.props.registerUser(inputUser);
  };

  // Validation
  private AllFieldsAreValid = () => {
    const {
      usernameConfig,
      passwordConfig,
      confirmPasswordConfig
    } = this.state;
    return (
      this.validateField(usernameConfig, usernameConfig.value) &&
      this.validateField(passwordConfig, passwordConfig.value) &&
      this.validateField(confirmPasswordConfig, confirmPasswordConfig.value)
    );
  };
  private validateField = (
    inputÇonfiguration: ITextFieldConfiguration,
    newInputValue: string
  ) => {
    const { pattern } = inputÇonfiguration;
    const passwordValue = this.state.passwordConfig.value;
    // If field has no pattern, the input field is for confirmation.
    return pattern
      ? pattern.test(newInputValue)
      : newInputValue === passwordValue;
  };
}

export default Register;
