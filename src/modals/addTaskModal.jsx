import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showModal, hideModal, addTask } from "../actions/index.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./modal.css";

import Modal from "react-responsive-modal";

// Custom Modal styling
const customStyles = {
  modal: {
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    top: "180px",
    left: "150px",
    right: "150px",
    bottom: "190px",
    position: "absolute"
  }
};

// Yup - Form validator framework
// The validation scheme which is used in combination with Formik
// to validate the input data
const addTaskSchema = Yup.object().shape({
  title: Yup.string()
    .required("Required")
    .max(20),
  description: Yup.string()
    .required("Required")
    .max(150),
  estimatedTime: Yup.number()
    .required("Required")
    .positive("Time must be > 0")
    .integer("Time must be integer value")
});

// Formik - Form building framework
// Allows us to easily get values from state, validate the inputs (with Yup) and
// submit data with ease
const AddTaskForm = (hideModal, addTask) => (
  <div>
    <h1>Add New Task</h1>
    <Formik
      initialValues={{
        title: "",
        description: "",
        estimatedTime: ""
      }}
      validationSchema={addTaskSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          fetch("http://127.0.0.1:3000/add_task", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values, null, 2)
          })
            .then(response => response.json())
            .then(responseData => {
              addTask(responseData);
            });

          hideModal();
          setSubmitting(false);
        }, 500);
      }}
      render={props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" style={{ display: "block" }}>
              Title
            </label>
            <input
              id="title"
              placeholder="Enter your title"
              type="text"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.title && touched.title
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.title && touched.title && (
              <div className="input-feedback">{errors.title}</div>
            )}
            <label htmlFor="description" style={{ display: "block" }}>
              Description
            </label>
            <input
              id="description"
              placeholder="Enter your description"
              type="text"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.description && touched.description
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.description && touched.description && (
              <div className="input-feedback">{errors.description}</div>
            )}
            <label htmlFor="estimatedTime" style={{ display: "block" }}>
              Estimated Time
            </label>
            <input
              id="estimatedTime"
              placeholder="Enter your estimated completion time (seconds)"
              type="text"
              value={values.estimatedTime}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.estimatedTime && touched.estimatedTime
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.estimatedTime && touched.estimatedTime && (
              <div className="input-feedback">{errors.estimatedTime}</div>
            )}
            <button
              type="button"
              className="modalButton"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" className="modalButton">
              Submit
            </button>
          </form>
        );
      }}
    />
  </div>
);

class AddTaskModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modalApp">
        <Modal
          open={this.props.modalIsOpen}
          onClose={this.props.hideModal}
          center
          focusTrapped
          styles={customStyles}
        >
          {AddTaskForm(this.props.hideModal, this.props.addTask)}
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modalIsOpen: state.modalIsOpen
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addTask: addTask,
      showModal: showModal,
      hideModal: hideModal
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AddTaskModal);
