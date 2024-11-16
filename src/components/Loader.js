import React from "react";

const Loader = ({ width = "40px", height = "40px", type = "" }) => {
  return (
    <div
      style={{
        width: "100%",
        height: type == "categoryGamepage" ? "60vh" : "",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: width, height: height }}
        className="animate-spin"
        src="https://www.svgrepo.com/show/199956/loading-loader.svg"
        alt="Loading icon"
      />
    </div>
  );
};

export default Loader;
