import * as React from "react";

import "./Home.css";

class Home extends React.Component {
  public render() {
    return <img src={require("./cover.jpg")} id="coverImg" />;
  }
}

export default Home;
