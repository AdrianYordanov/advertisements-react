import * as React from "react";

import "./Home.css";

class Home extends React.Component {
  public render() {
    return (
      <div id="imageContainer">
        <img src={require('./cover.jpg')}/>
      </div>
    )
  }
}

export default Home;
