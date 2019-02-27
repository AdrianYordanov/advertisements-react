import * as React from "react";

// Utilities
import { IAdvertisement } from "../../../utils/Contracts";

// Components
import Pagination from "../../Pagination";
import PublicAdvertisement from "./PublicAdvertisement";

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
  constructor(props: any) {
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
        <h1 style={{ margin: "40px" }}>
          Here are {data.length} avaiable advertisements.
        </h1>
        <div style={{ width: "90%" }} className="row">
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
        </div>
        {this.showPagination(reducedData.length)}
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

export default PublicAdvertisements;
