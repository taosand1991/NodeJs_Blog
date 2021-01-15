import React, { Fragment } from "react";

const LandingPage = () => {
  return (
    <Fragment>
      <div className="main-page">
        <div className="row">
          <div className="col-12 col-xl-6">
            <div className="content">
              <h5>A Post Website With Node Js</h5>
              <h6>Keep Looking for more of our projects</h6>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <img src="/static/images/kissing.png" alt="" />
          </div>
        </div>
      </div>
      <div className="section-2">
        <div className="box-content">
          <span>
            <i className="far fa-futbol"></i>
          </span>
          <h4>Sport News</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lacinia est mi, id blandit velit pulvinar eget. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Praesent eget urna lorem. Etiam iaculis volutpat tempor.
            Suspendisse bibendum auctor libero, nec porta tellus. Fusce maximus
            dui ac molestie sodales. Sed maximus dui id sodales porta. Nullam
            sit amet faucibus purus. Vestibulum purus leo, mattis vel risus vel,
          </p>
        </div>
        <div className="box-content">
          <span>
            <i className="fas fa-newspaper"></i>
          </span>
          <h4>Crime News</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lacinia est mi, id blandit velit pulvinar eget. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Praesent eget urna lorem. Etiam iaculis volutpat tempor.
            Suspendisse bibendum auctor libero, nec porta tellus. Fusce maximus
            dui ac molestie sodales. Sed maximus dui id sodales porta. Nullam
            sit amet faucibus purus. Vestibulum purus leo, mattis vel risus vel,
          </p>
        </div>
        <div className="box-content">
          <span>
            <i className="fas fa-bell"></i>
          </span>
          <h4>Notifications</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lacinia est mi, id blandit velit pulvinar eget. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Praesent eget urna lorem. Etiam iaculis volutpat tempor.
            Suspendisse bibendum auctor libero, nec porta tellus. Fusce maximus
            dui ac molestie sodales. Sed maximus dui id sodales porta. Nullam
            sit amet faucibus purus. Vestibulum purus leo, mattis vel risus vel,
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
