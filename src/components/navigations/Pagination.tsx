import * as React from "react";

import classNames from "classnames";

import "./Pagination.css";

export interface IProps {
  currentPageId: number;
  firstPageId: number;
  maxPaginationPages: number;
  totalPages: () => number;
  onPageChange: (newcurrentPageId: number) => void;
  onFirstPageChange: (newFirstPageId: number) => void;
}

export interface IState {
  currentNavigationPosition: number;
}

class Pagination extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentNavigationPosition:
        this.props.currentPageId - this.props.firstPageId
    };
  }

  // If there had been changes and they affect to the pages count, we should update the "currentNavigationPosition".
  public componentWillUpdate = () => {
    const pagesToDisplay = this.calculatePagesToDisplay();
    if (
      pagesToDisplay > 0 &&
      this.state.currentNavigationPosition >= pagesToDisplay
    ) {
      this.setState({ currentNavigationPosition: pagesToDisplay - 1 });
    }
  };

  public render() {
    const { currentNavigationPosition } = this.state;
    const { currentPageId, totalPages } = this.props;
    const container = this.getNavigationContainer();
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={classNames("page-item", {
              disabled: currentPageId <= 1
            })}
          >
            <a
              href="#"
              className="page-link"
              onClick={this.raisePageChange(
                currentNavigationPosition - 1,
                currentPageId - 1
              )}
            >
              Previous
            </a>
          </li>
          {container.map((pageId, positionId) => {
            return (
              <li
                className={classNames("page-item", {
                  active: positionId === currentNavigationPosition
                })}
                key={positionId}
              >
                <a
                  href="#"
                  key={positionId}
                  className="page-link"
                  onClick={this.raisePageChange(positionId, pageId)}
                >
                  {pageId}
                </a>
              </li>
            );
          })}
          <li
            className={classNames("page-item", {
              disabled: currentPageId >= totalPages()
            })}
          >
            <a
              href="#"
              className="page-link"
              onClick={this.raisePageChange(
                currentNavigationPosition + 1,
                currentPageId + 1
              )}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  private raisePageChange = (
    newNavigationPosition: number,
    newPageId: number
  ) => () => {
    this.changeNavigationPosition(newNavigationPosition);
    this.props.onPageChange(newPageId);
  };

  private changeNavigationPosition = (newNavigationPosition: number) => {
    const { firstPageId, onFirstPageChange, maxPaginationPages } = this.props;
    if (newNavigationPosition < 0) {
      onFirstPageChange(firstPageId - 1);
    } else if (newNavigationPosition >= maxPaginationPages) {
      onFirstPageChange(firstPageId + 1);
    } else {
      this.setState({ currentNavigationPosition: newNavigationPosition });
    }
  };

  private getNavigationContainer = () => {
    const container = [];
    const pagesToDisplay = this.calculatePagesToDisplay();
    for (let i = 0; i < pagesToDisplay; i++) {
      container[i] = this.props.firstPageId + i;
    }

    return container;
  };

  private calculatePagesToDisplay() {
    const { maxPaginationPages, totalPages } = this.props;
    return maxPaginationPages < totalPages()
      ? maxPaginationPages
      : totalPages();
  }
}

export default Pagination;
