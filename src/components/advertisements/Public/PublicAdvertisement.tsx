import * as React from "react";

import { IAdvertisement } from "../../../utils/contracts";

import "./PublicAdvertisement.css";

export interface IProps {
  advertisement: IAdvertisement;
}

class PublicAdvertisement extends React.Component<IProps> {
  public render() {
    const { advertisement } = this.props;
    return (
      <div className="col-lg-4 col-md-6 mb-4 publicAdv">
        <div className="card h-100">
          <img className="card-img-top" src={advertisement.image} />
          <div className="card-body">
            <h4 className="card-title">
              <a href="#">{advertisement.title}</a>
            </h4>
            <h5>${advertisement.price.toFixed(2)}</h5>
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
