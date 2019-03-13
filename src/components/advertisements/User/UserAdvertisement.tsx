import * as React from "react";

import { connect } from "react-redux";

import { deleteAdvertisement } from "../../../actions/advertisementsActions";
import { IAdvertisement } from "../../../utils/contracts";

import "./UserAdvertisement.css";

export interface IProps {
  advertisement: IAdvertisement;
  deleteAdvertisement: (advertisementId: string) => void;
}

class UserAdvertisement extends React.Component<IProps, any> {
  public render() {
    const { advertisement } = this.props;
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
            onClick={this.onDelete}
          >
            <span className="glyphicon glyphicon-remove" /> Remove
          </button>
        </td>
      </tr>
    );
  }

  private onDelete = () => {
    this.props.deleteAdvertisement(this.props.advertisement._id);
  };
}

// Mapping
const mapActionsToProps = {
  deleteAdvertisement
};

export default connect(
  undefined,
  mapActionsToProps
)(UserAdvertisement);
