import * as React from "react";

// Utilities
import { IAdvertisement } from "../../../utils/Contracts";

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
            <img
              className="media-object"
              src={advertisement.image}
              style={{
                height: "300px",
                marginRight: "30px",
                width: "300px"
              }}
            />
            <div className="media-body">
              <h4 className="media-heading">
                <a href="#">{advertisement.title}</a>
              </h4>
              <div className="media-heading">{advertisement.description}</div>
            </div>
          </div>
        </td>
        <td className="col-md-1 text-center">
          <strong>Price: {advertisement.price}$</strong>
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
    const { advertisement, deleteAdvertisement } = this.props;
    deleteAdvertisement(advertisement._id);
  };
}

export default UserAdvertisement;
