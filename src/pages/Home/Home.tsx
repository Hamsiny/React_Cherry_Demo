import React from "react";
import MediaCard from "../../components/MediaCard/MediaCard";

const Home = (props) => {
  const { isLoggedIn, userLoggedIn } = props;

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h3 className="text-center mb-3">
          {isLoggedIn && userLoggedIn !== null ? (
            <strong>Hi {userLoggedIn["userName"]}</strong>
          ) : (
            <strong>This is Home Page</strong>
          )}
        </h3>
        <MediaCard />
      </div>
    </div>
  );
};

export default Home;
