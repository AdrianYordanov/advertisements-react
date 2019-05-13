import * as React from "react";

import { IAdvertisement } from "../../../typeScript/contracts/contracts";

import "./Advertisement.css";

export interface IProps {
  advertisement: IAdvertisement;
}

const Advertisement = (props: IProps) => {
  const { advertisement } = props;
  return (
    <div className="col-lg4 col-md-4 mb-4 publicAd">
      <div className="card h-100">
        <img className="card-img-top" src={advertisement.image} />
        <div className="card-body">
          <h4 className="card-title">
            <a href="#">{advertisement.title}</a>
          </h4>
          <h5>${advertisement.price.toFixed(2)}</h5>
          <span className="card-text">{advertisement.description}</span>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            Owner: <a href="#">{advertisement.owner}</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
