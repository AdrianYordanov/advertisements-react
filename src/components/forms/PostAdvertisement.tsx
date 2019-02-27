import * as React from "react";

// Components
import TextAreaValidator from "../fields/TextAreaValidator";
import TextField from "../fields/TextValidator";

// Contracts
import { ITextFieldConfiguration } from "../../utils/Contracts";

// CSS
import "./CommonForm.css";

export interface IProps {
  postAdvertisement: (data: FormData) => void;
}

export interface IState {
  titleConfig: ITextFieldConfiguration;
  priceConfig: ITextFieldConfiguration;
  descriptionConfig: ITextFieldConfiguration;
  image?: File;
}

class PostAdvertisement extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      descriptionConfig: {
        fieldType: "description",
        message: "'s length must be at least 10 characters.",
        pattern: /.{10,}/,
        value: ""
      },
      image: undefined,
      priceConfig: {
        fieldType: "price",
        message: " must be positive number.",
        pattern: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/,
        value: ""
      },
      titleConfig: {
        fieldType: "title",
        message: "'s length must be at least 5 characters.",
        pattern: /.{5,}/,
        value: ""
      }
    };
  }

  public render() {
    const { titleConfig, descriptionConfig, priceConfig } = this.state;
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Create Advertisement</h3>
            <form onSubmit={this.submitHandler}>
              <TextField
                fieldConfig={titleConfig}
                executeValidation={this.validateField}
                onFieldChange={this.titleHandler}
              />
              <TextAreaValidator
                fieldConfig={descriptionConfig}
                executeValidation={this.validateField}
                onFieldChange={this.descriptionHanlder}
              />
              <TextField
                fieldConfig={priceConfig}
                executeValidation={this.validateField}
                onFieldChange={this.priceHandler}
              />
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  onChange={this.fileHandler}
                />
                <label className="custom-file-label">Choose file</label>
              </div>
              <div style={{ margin: "10px" }} className="form-group">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Create Advertisement"
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
  private titleHandler = (newValue: string) => {
    const temp = { ...this.state.titleConfig };
    temp.value = newValue;
    this.setState({ titleConfig: temp });
  };
  private descriptionHanlder = (newValue: string) => {
    const temp = { ...this.state.descriptionConfig };
    temp.value = newValue;
    this.setState({ descriptionConfig: temp });
  };
  private priceHandler = (newValue: string) => {
    const temp = { ...this.state.priceConfig };
    temp.value = newValue;
    this.setState({ priceConfig: temp });
  };
  private fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = (event.target.files as FileList)[0];
    this.setState({ image });
  };
  private submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!this.state.image) {
      return;
    }

    const formData = new FormData();
    formData.append("title", this.state.titleConfig.value);
    formData.append("description", this.state.descriptionConfig.value);
    formData.append("price", this.state.priceConfig.value);
    formData.append("image", this.state.image);
    this.props.postAdvertisement(formData);
  };

  // Validation
  private AllFieldsAreValid = () => {
    const { titleConfig, descriptionConfig, priceConfig } = this.state;
    return (
      this.validateField(titleConfig, titleConfig.value) &&
      this.validateField(descriptionConfig, descriptionConfig.value) &&
      this.validateField(priceConfig, priceConfig.value) &&
      typeof this.state.image !== "undefined"
    );
  };
  private validateField = (
    inputConfiguration: ITextFieldConfiguration,
    newInputValue: string
  ) => {
    const { pattern } = inputConfiguration;
    return pattern ? pattern.test(newInputValue) : false;
  };
}

export default PostAdvertisement;
