import React from "react";

const getCategoryColor = (category) => {
  if (category.toLowerCase() === "romance") {
    return <span className="badge badge-primary float-right">{category}</span>;
  } else if (category.toLowerCase() === "sports") {
    return <span className="badge badge-success float-right">{category}</span>;
  } else if (category.toLowerCase() === "politics") {
    return <span className="badge badge-danger float-right">{category}</span>;
  } else if (category.toLowerCase() === "crime") {
    return <span className="badge badge-warning float-right">{category}</span>;
  }
};

export default getCategoryColor;
