import React, { Fragment } from "react";
import Input from "../refactors/Input";
import Button from "../refactors/Button";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalFooter,
  MDBModalBody,
} from "mdbreact";

const CreateCategory = ({
  showModal,
  category,
  handleChange,
  handleModal,
  handleSubmit,
  loading,
}) => {
  return (
    <Fragment>
      {showModal && (
        <MDBContainer>
          <MDBModal isOpen={showModal} toggle={handleModal}>
            <MDBModalHeader toggle={handleModal}>Add Category</MDBModalHeader>
            <MDBModalBody>
              {loading && <div className="spinner" />}
              <form onSubmit={handleSubmit}>
                <Input
                  className="form-control"
                  placeholder="Add Category..."
                  value={category}
                  onChange={handleChange}
                  label="Category"
                />
                <Button
                  className="btn btn-primary btn-sm"
                  text="create category"
                />
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={handleModal}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      )}
    </Fragment>
  );
};

export default CreateCategory;
