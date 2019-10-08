import * as React from "react";
import { connect } from "react-redux";
import { IAdvertisement, IAppState } from "src/typeScript/contracts";
import { fetchAllAdvertisements } from "src/redux/advertisements/actions";
import { PublicAdvertisement, Pagination } from "src/components";
import "./AllAdvertisements.css";

interface IState {
  currentPage: number;
  itemsPerPage: number;
  isHeaderShown: boolean;
}

interface IProps {
  data: IAdvertisement[];
  isLoading: boolean;
  fetchPublicAdvertisements: () => void;
}

class AllAdvertisements extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 2,
      isHeaderShown: true
    };
  }

  public componentWillMount = () => {
    this.props.fetchPublicAdvertisements();
  };

  public render() {
    const { data } = this.props;
    const reducedData = this.reduceDataForTheCurrentPage();
    const { isHeaderShown, currentPage } = this.state;
    return (
      <div style={{ backgroundColor: "#e9ecef" }}>
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            {isHeaderShown && (
              <div className="advertisements-count">
                <div
                  style={{
                    width: 30,
                    height: 30,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#530000"
                  }}
                >
                  X
                </div>
                <h1
                  style={{ fontWeight: 200 }}
                  onClick={() => this.setState({ isHeaderShown: false })}
                >
                  {data.length} avaiable advertisements.
                </h1>
              </div>
            )}

            {this.props.isLoading && (
              <img
                width={200}
                height={200}
                src="/assets/svgs/Loader.svg"
                alt=""
              />
            )}
          </div>
          <div className="row">
            {reducedData.map((advertisement: IAdvertisement) => (
              <PublicAdvertisement
                key={advertisement._id}
                advertisement={advertisement}
              />
            ))}
          </div>
          <div className="row justify-content-center">
            {data.length > 0 && (
              <Pagination
                currentPageId={currentPage}
                onPageChange={this.changePageHandler}
                totalPages={this.getTotalPages()}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  private changePageHandler = (currentPage: number) => {
    this.setState({ currentPage });
  };

  private getTotalPages = () => {
    const { itemsPerPage } = this.state;
    const { data } = this.props;
    return Math.ceil(data.length / itemsPerPage);
  };

  private reduceDataForTheCurrentPage = () => {
    const { data } = this.props;
    const { currentPage, itemsPerPage } = this.state;
    if (data.length > 0) {
      const startingAdvertisementIndex = (currentPage - 1) * itemsPerPage;
      return data.slice(
        startingAdvertisementIndex,
        startingAdvertisementIndex + itemsPerPage
      );
    }

    return [];
  };
}

const mapStateToProps = (state: IAppState) => {
  return {
    data: state.advertisements.publicAdvertisements,
    isLoading: state.advertisements.loader
  };
};

const mapDispatchTopProps = (dispatch: any) => {
  return {
    fetchPublicAdvertisements: () => dispatch(fetchAllAdvertisements())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(AllAdvertisements);
