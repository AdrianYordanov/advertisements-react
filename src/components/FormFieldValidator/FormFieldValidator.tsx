import * as React from "react";
import "./FormFieldValidator.css";

interface IProps {
  invalidMessage: string;
  isValid: boolean;
  children: any;
}

export default (props: IProps) => {
  const { invalidMessage, isValid } = props;
  return (
    <div className="form-group">
      {props.children}
      {!isValid && <div className="error">{invalidMessage}</div>}
    </div>
  );
};
