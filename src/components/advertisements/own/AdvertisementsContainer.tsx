import * as React from "react";

import { connect } from "react-redux";

import { fetchUserAdvertisements } from "../../../actions/advertisements";
import {
  IAdvertisement,
  IReduxState
} from "../../../typeScript/contracts/contracts";
import Advertisement from "./Advertisement";

import "./AdvertisementsContainer.css";

export interface IProps {
  data: IAdvertisement[];
  isLoading: boolean;
  fetchUserAdvertisements: () => void;
}

class AdvertisementsContainer extends React.Component<IProps, any> {
  public componentWillMount = () => {
    this.props.fetchUserAdvertisements();
  };

  public render() {
    const { data, isLoading } = this.props;
    return (
      <React.Fragment>
        <h1 className="userAdvertisementsHeading">
          You have {data.length} advertisements.
        </h1>
        {isLoading && (
          <img width={200} height={200} src="/assets/Loader.svg" alt="" />
        )}
        <table className="userAdvertisementsPanel">
          <tbody>
            {data.map((advertisement: IAdvertisement) => {
              return (
                <Advertisement
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
  return {
    data: state.advertisements.userAdvertisements,
    isLoading: state.advertisements.loader
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserAdvertisements: () => dispatch(fetchUserAdvertisements())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementsContainer);
