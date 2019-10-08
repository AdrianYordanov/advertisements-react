import * as React from "react";
import { connect } from "react-redux";
import { IAdvertisement, IAppState } from "src/typeScript/contracts";
import { fetchUserAdvertisements } from "src/redux/advertisements/actions";
import { UserAdvertisement } from "src/components";
import "./MyAdvertisements.css";

interface IProps {
  data: IAdvertisement[];
  isLoading: boolean;
  fetchUserAdvertisements: () => void;
}

class MyAdvertisements extends React.Component<IProps, any> {
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
          <img width={200} height={200} src="/assets/svgs/Loader.svg" alt="" />
        )}
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
const mapStateToProps = (state: IAppState) => {
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
)(MyAdvertisements);
