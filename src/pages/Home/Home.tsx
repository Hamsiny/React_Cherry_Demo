import React, { Component } from "react";
import MediaCard from "../../components/MediaCard/MediaCard";

export class Home extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div>
          <h3 className="text-center mb-3">
            <strong>This is Home Page</strong>
          </h3>
          <MediaCard />
        </div>
      </div>
    );
  }
}

export default Home;
