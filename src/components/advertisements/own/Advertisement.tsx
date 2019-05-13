import * as React from "react";

import { connect } from "react-redux";

import { deleteAdvertisement } from "../../../actions/advertisements";
import { IAdvertisement } from "../../../typeScript/contracts/contracts";

import "./Advertisement.css";

export interface IProps {
  advertisement: IAdvertisement;
  deleteAdvertisement: (advertisementId: string) => void;
}

const Advertisement = (props: IProps) => {
  const { advertisement } = props;
  return (
    <tr>
      <td className="col-md-6">
        <div className="media">
          <img className="media-object" src={advertisement.image} />
          <div className="media-body">
            <h4 className="media-heading">
              <a href="#">{advertisement.title}</a>
            </h4>
            <div className="media-heading">{advertisement.description}</div>
          </div>
        </div>
      </td>
      <td className="col-md-1 text-center">
        <strong>Price: {advertisement.price.toFixed(2)}$</strong>
      </td>
      <td className="col-md-1">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.deleteAdvertisement(advertisement._id)}
        >
          <span className="glyphicon glyphicon-remove" /> Remove
        </button>
      </td>
    </tr>
  );
};

// Mapping
const mapActionsToProps = {
  deleteAdvertisement
};

export default connect(
  undefined,
  mapActionsToProps
)(Advertisement);
