import * as React from "react";
import { connect } from "react-redux";
import { Field, TextField, FileField } from "src/typeScript/classes";
import { postAdvertisement } from "src/redux/advertisements/actions";
import { FormFieldValidator } from "src/components";
import "src/components/Form.css";

interface IProps {
  postAdvertisement: (data: FormData) => void;
}

interface IState {
  title: TextField;
  price: TextField;
  description: TextField;
  image: FileField;
}

class CreateAdverisement extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: new TextField(
        "Title's length must be at least 5 characters.",
        /.{5,}/
      ),
      price: new TextField(
        "Price must be positive number.",
        /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/
      ),
      description: new TextField(
        "Description's length must be at least 10 characters.",
        /.{10,}/
      ),
      image: new FileField("А picture must to be selected.")
    };
  }

  public render() {
    const { title, price, description, image } = this.state;
    const fieldsConfig: Field[] = [title, price, description, image];
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Create Advertisement</h3>
            <form onSubmit={this.submitHandler}>
              <FormFieldValidator
                invalidMessage={title.message}
                isValid={title.validateField()}
              >
                <input
                  type="text"
                  placeholder="title"
                  autoComplete="title"
                  className="form-control"
                  onChange={this.titleHandler}
                />
              </FormFieldValidator>
              <FormFieldValidator
                invalidMessage={description.message}
                isValid={description.validateField()}
              >
                <textarea
                  placeholder="description"
                  className="form-control"
                  onChange={this.descriptionHanlder}
                />
              </FormFieldValidator>
              <FormFieldValidator
                invalidMessage={price.message}
                isValid={price.validateField()}
              >
                <input
                  type="text"
                  placeholder="price"
                  autoComplete="price"
                  className="form-control"
                  onChange={this.priceHandler}
                />
              </FormFieldValidator>
              <FormFieldValidator
                invalidMessage={image.message}
                isValid={image.validateField()}
              >
                <div id="imgSelector" className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={this.fileHandler}
                  />
                  <label className="custom-file-label">Choose file</label>
                </div>
              </FormFieldValidator>

              <div className="form-group">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Create Advertisement"
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

  // Handlers
  private titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { title } = this.state;
    title.value = event.target.value;
    this.setState({ title });
  };
  private priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { price } = this.state;
    price.value = event.target.value;
    this.setState({ price });
  };
  private descriptionHanlder = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { description } = this.state;
    description.value = event.target.value;
    this.setState({ description });
  };
  private fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { image } = this.state;
    image.value = (event.target.files as FileList)[0];
    this.setState({ image });
  };
  private submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, price, image } = this.state;
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("image", image.value as File);
    this.props.postAdvertisement(formData);
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    postAdvertisement: (formData: FormData) =>
      dispatch(postAdvertisement(formData))
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(CreateAdverisement);
