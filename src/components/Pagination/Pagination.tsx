import * as React from "react";
import classNames from "classnames";
import "./Pagination.css";

interface IProps {
  currentPageId: number;
  totalPages: number;
  onPageChange: (newcurrentPageId: number) => void;
}

export default (props: IProps) => {
  const { currentPageId, totalPages, onPageChange } = props;
  const container: number[] = [];
  for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
    container.push(pageIndex);
  }
  return (
    <nav aria-label="Page navigation example" className="pagination">
      <ul className="pagination">
        <li
          className={classNames("page-item", {
            disabled: currentPageId <= 1
          })}
        >
          <a
            href="#"
            className="page-link"
            onClick={() => onPageChange(currentPageId - 1)}
          >
            Previous
          </a>
        </li>
        {container.map(positionId => {
          console.log(positionId);
          return (
            <li
              className={classNames("page-item", {
                active: positionId === currentPageId
              })}
              key={positionId}
            >
              <a
                href="#"
                key={positionId}
                className="page-link"
                onClick={() => onPageChange(positionId)}
              >
                {positionId}
              </a>
            </li>
          );
        })}
        <li
          className={classNames("page-item", {
            disabled: currentPageId >= totalPages
          })}
        >
          <a
            href="#"
            className="page-link"
            onClick={() => onPageChange(currentPageId + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
