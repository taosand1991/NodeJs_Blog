import React from "react";

const Logout = () => {
  localStorage.removeItem("key");
  window.location.href = "/";
  return (
    <div>
      <h5>Logging out</h5>
    </div>
  );
};

export default Logout;
