import * as React from "react";

import { connect } from "react-redux";

import { fetchUserAdvertisements } from "../../../actions/advertisementsActions";
import { IAdvertisement, IReduxState } from "../../../utils/contracts";
import UserAdvertisement from "./UserAdvertisement";

import "./UserAdvertisements.css";

export interface IProps {
  data: IAdvertisement[];
  getAdvertisements: () => void;
}

class UserAdvertisements extends React.Component<IProps, any> {
  public componentWillMount = () => {
    this.props.getAdvertisements();
  };

  public render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <h1 className="userAdvertisementsHeading">
          You have {data.length} advertisements.
        </h1>
        <table className="userAdvertisementsPanel">
          <tbody>
            {data.map((advertisement: IAdvertisement) => {
              return (
                <UserAdvertisement
                  key={advertisement._id}
                  advertisement={advertisement}
                />
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

// Mapping
const mapStateToProps = (state: IReduxState) => {
  return { data: state.advertisements.userAdvertisements };
};
const mapActionsToProps = {
  getAdvertisements: fetchUserAdvertisements
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserAdvertisements);
