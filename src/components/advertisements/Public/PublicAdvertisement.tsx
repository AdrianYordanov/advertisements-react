import * as React from "react";

// Contracts
import { IAdvertisement } from "../../../utils/Contracts";

export interface IProps {
  advertisement: IAdvertisement;
}

class PublicAdvertisement extends React.Component<IProps> {
  public render() {
    const { advertisement } = this.props;
    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
          <img
            className="card-img-top"
            src={advertisement.image}
            style={{ height: "300px" }}
          />
          <div className="card-body">
            <h4 className="card-title">
              <a href="#">{advertisement.title}</a>
            </h4>
            <h5>${advertisement.price}</h5>
            <p className="card-text">{advertisement.description}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              Owner: <a href="#">{advertisement.owner}</a>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default PublicAdvertisement;
