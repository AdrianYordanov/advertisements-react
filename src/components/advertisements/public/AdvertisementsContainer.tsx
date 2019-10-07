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
  isHeaderShown: boolean;
}

export interface IProps {
  data: IAdvertisement[];
  isLoading: boolean,
  fetchPublicAdvertisements: () => void;
}

class AdvertisementsContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isHeaderShown: true,
      currentPage: 1,
      firstPage: 1,
      maxDataPerPage: 6,
      maxPaginationPages: 10
    };
  }

  public componentWillMount = () => {
    this.props.fetchPublicAdvertisements();
  };

  public render() {
    const { data } = this.props;
    const reducedData = this.reduceData();
    const { isHeaderShown } = this.state;
    return (
      <div style={{backgroundColor: '#e9ecef'}}>
        <div className="container">
          <div className='d-flex flex-column justify-content-center align-items-center'>
            {
              isHeaderShown &&
              <h1 id="adsCount" onClick={() => this.setState({isHeaderShown: !isHeaderShown})}>{data.length} avaiable advertisements.</h1>
            }

            {
              this.props.isLoading &&
              <img width={200} height={200} src="/assets/Loader.svg" alt=""/>
            }
            </div>
            <div className="row">
              {reducedData.map((advertisement: IAdvertisement) => (
                <Advertisement
                  key={advertisement._id}
                  advertisement={advertisement}/>
              ))}
            </div>
            <div className="row justify-content-center">
              {this.conditionalPagination(reducedData.length)}
            </div>
        </div>
      </div>
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
  return { 
    data: state.advertisements.publicAdvertisements,
    isLoading: state.advertisements.loader
  };
};
const mapDispatchTopProps = (dispatch: any) => {
  return {
    fetchPublicAdvertisements: () => dispatch(fetchPublicAdvertisements())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(AdvertisementsContainer);
