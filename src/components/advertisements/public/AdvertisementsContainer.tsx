import * as React from "react";

import { connect } from "react-redux";

import { fetchPublicAdvertisements } from "../../../actions/advertisements";
import {
  IAdvertisement,
  IReduxState
} from "../../../typeScript/contracts/contracts";
import Pagination from "../../navigations/Pagination";
import Advertisement from "./Advertisement";

import "./AdvertisementsContainer.css";

export interface IState {
  currentPage: number;
  firstPage: number;
  maxDataPerPage: number;
  maxPaginationPages: number;
}

export interface IProps {
  data: IAdvertisement[];
  fetchPublicAdvertisements: () => void;
}

class AdvertisementsContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentPage: 1,
      firstPage: 1,
      maxDataPerPage: 5,
      maxPaginationPages: 10
    };
  }

  public componentWillMount = () => {
    this.props.fetchPublicAdvertisements();
  };

  public render() {
    const { data } = this.props;
    const reducedData = this.reduceData();
    return (
      <React.Fragment>
        <h1 id="adsCount">{data.length} avaiable advertisements.</h1>
        <div className="col">
          <div className="col-sm-10 fullWidth">
            <div className="row">
              {reducedData.map((advertisement: IAdvertisement) => (
                <Advertisement
                  key={advertisement._id}
                  advertisement={advertisement}
                />
              ))}
            </div>
          </div>
          {this.conditionalPagination(reducedData.length)}
        </div>
      </React.Fragment>
    );
  }

  // Functionality
  private conditionalPagination = (dataLength: number) => {
    const { firstPage, currentPage, maxPaginationPages } = this.state;
    return dataLength > 0 ? (
      <Pagination
        currentPageId={currentPage}
        firstPageId={firstPage}
        maxPaginationPages={maxPaginationPages}
        totalPages={() =>
          Math.ceil(this.props.data.length / this.state.maxDataPerPage)
        }
        onPageChange={(newPageId: number) =>
          this.setState({ currentPage: newPageId })
        }
        onFirstPageChange={(newFirstPageId: number) =>
          this.setState({ firstPage: newFirstPageId })
        }
      />
    ) : (
      ""
    );
  };
  private reduceData = () => {
    const { data } = this.props;
    const { currentPage, maxDataPerPage } = this.state;
    if (data.length > 0) {
      const startingAdvertisementIndex = (currentPage - 1) * maxDataPerPage;
      return data.slice(
        startingAdvertisementIndex,
        startingAdvertisementIndex + maxDataPerPage
      );
    }

    return [];
  };
}

// Mapping
const mapStateToProps = (state: IReduxState) => {
  return { data: state.advertisements.publicAdvertisements };
};
const mapActionsToProps = {
  fetchPublicAdvertisements
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AdvertisementsContainer);
