import * as React from "react";
import { connect } from "react-redux";
import { deleteAdvertisement } from "src/redux/advertisements/actions";
import { IAdvertisement } from "src/typeScript/contracts";
import "./UserAdvertisement.css";

interface IReduxProps {
  deleteAdvertisement: (advertisementId: string) => void;
}

interface IProps extends IReduxProps {
  advertisement: IAdvertisement;
}

const UserAdvertisement = (props: IProps) => {
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

const mapDispatchToProps = (dispatch: any): IReduxProps => {
  return {
    deleteAdvertisement: (id: string) => dispatch(deleteAdvertisement(id))
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(UserAdvertisement);
