import * as React from "react";
import { connect } from "react-redux";
import { Field, TextField } from "src/typeScript/classes";
import { IUserForm } from "../../typeScript/contracts";
import { registerUser } from "src/redux/user/actions";
import { FormFieldValidator } from "src/components";
import "../../components/Form.css";

interface IProps {
  registerUser: (user: IUserForm) => void;
}

interface IState {
  username: TextField;
  password: TextField;
  confirmPassword: TextField;
}

class Register extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: new TextField(
        "Username's length must be at least 5 characters - at least 1 letter.",
        /^(?=.*[a-zA-Z])(?=.{5,})/
      ),
      password: new TextField(
        "Password's length must be at least 8 characters - letters and digits",
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/
      ),
      confirmPassword: new TextField(
        "Confirm password must be equal to the password.",
        new RegExp("")
      )
    };
  }

  public render() {
    const { username, password, confirmPassword } = this.state;
    const fieldsConfig: Field[] = [username, password, confirmPassword];
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Register</h3>
            <form onSubmit={this.submitHandler}>
              <FormFieldValidator
                invalidMessage={username.message}
                isValid={username.validateField()}
              >
                <input
                  type="text"
                  placeholder="username"
                  autoComplete="username"
                  className="form-control"
                  onChange={this.usernameHandler}
                />
              </FormFieldValidator>
              <FormFieldValidator
                invalidMessage={password.message}
                isValid={password.validateField()}
              >
                <input
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  className="form-control"
                  onChange={this.passwordHandler}
                />
              </FormFieldValidator>
              <FormFieldValidator
                invalidMessage={confirmPassword.message}
                isValid={confirmPassword.validateField()}
              >
                <input
                  type="password"
                  placeholder="confirm password"
                  autoComplete="confirm password"
                  className="form-control"
                  onChange={this.confirmPasswordHandler}
                />
              </FormFieldValidator>
              <div className="form-group">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Register"
                  disabled={fieldsConfig.some(
                    fieldConfig => !fieldConfig.validateField()
                  )}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Fields Handlers
  private usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { username } = this.state;
    username.value = event.target.value;
    this.setState({ username });
  };
  private passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { password, confirmPassword } = this.state;
    password.value = event.target.value;
    confirmPassword.pattern = new RegExp(event.target.value);
    this.setState({ password, confirmPassword });
  };
  private confirmPasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { confirmPassword } = this.state;
    confirmPassword.value = event.target.value;
    this.setState({ confirmPassword });
  };
  private submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = this.state;
    const user: IUserForm = {
      username: username.value,
      password: password.value
    };
    this.props.registerUser(user);
  };
}

// Mapping
const mapDispatchToProps = (dispatch: any) => {
  return {
    registerUser: (user: IUserForm) => dispatch(registerUser(user))
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(Register);
