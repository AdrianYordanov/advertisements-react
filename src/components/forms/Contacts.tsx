import * as React from "react";

// CSS
import "./CommonForm.css";

class Contacts extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-sm">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-12">
                <h1 className="h1">
                  Feel free to contact us.{" "}
                  <small>You will get feedback very soon.</small>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <form>
                <legend>
                  <span className="glyphicon glyphicon-globe" />
                   Our office
                </legend>
                <address>
                  <strong>Sofia, Bulgaria</strong>
                  <br />
                  Business Center ESTE
                  <br />
                  Block 9, 28I Samokov Str
                  <br />
                  <abbr title="Phone">P:</abbr>
                  (+359) 456-7890
                </address>
                <address>
                  <strong>Email</strong>
                  <br />
                  <a href="mailto:#">adrian.yordanov.official@gmail.com</a>
                </address>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Contacts;
