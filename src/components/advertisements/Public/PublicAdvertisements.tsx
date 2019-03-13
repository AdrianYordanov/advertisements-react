import * as React from "react";

import { connect } from "react-redux";

import { fetchPublicAdvertisements } from "../../../actions/advertisementsActions";
import { IAdvertisement, IReduxState } from "../../../utils/contracts";
import Pagination from "../../navigations/Pagination";
import PublicAdvertisement from "./PublicAdvertisement";

import "./PublicAdvertisements.css";

export interface IState {
  currentPage: number;
  firstPage: number;
  maxDataPerPage: number;
  maxPaginationPages: number;
}

export interface IProps {
  data: IAdvertisement[];
  getAdvertisements: () => void;
}

class PublicAdvertisements extends React.Component<IProps, IState> {
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
    this.props.getAdvertisements();
  };

  public render() {
    const { data } = this.props;
    const reducedData = this.reduceData();
    return (
      <React.Fragment>
        <h1 className="advHeading">{data.length} avaiable advertisements.</h1>
        <div className="row advPanel">
          <div className="col-sm-10">
            <div className="row">
              {reducedData.map((advertisement: IAdvertisement) => (
                <PublicAdvertisement
                  key={advertisement._id}
                  advertisement={advertisement}
                />
              ))}
            </div>
          </div>
          {this.showPagination(reducedData.length)}
        </div>
      </React.Fragment>
    );
  }

  // Handlers
  private changeCurrentPageHandler = (newPageId: number) => {
    this.setState({ currentPage: newPageId });
  };
  private changeFirstPageHandler = (newFirstPageId: number) => {
    this.setState({ firstPage: newFirstPageId });
  };

  // Functionality
  private showPagination = (dataLength: number) => {
    const { firstPage, currentPage, maxPaginationPages } = this.state;
    return dataLength > 0 ? (
      <Pagination
        currentPageId={currentPage}
        firstPageId={firstPage}
        maxPaginationPages={maxPaginationPages}
        totalPages={this.calculateTotalPages}
        onPageChange={this.changeCurrentPageHandler}
        onFirstPageChange={this.changeFirstPageHandler}
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
  private calculateTotalPages = () => {
    return Math.ceil(this.props.data.length / this.state.maxDataPerPage);
  };
}

// Mapping
const mapStateToProps = (state: IReduxState) => {
  return { data: state.advertisements.publicAdvertisements };
};
const mapActionsToProps = {
  getAdvertisements: fetchPublicAdvertisements
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PublicAdvertisements);
