import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { startEditTask, finishEditTask, closeEditTask } from "../actions/index.js"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './../containers/modalStyling.css'
import './../containers/modal.css';

import Modal from 'react-responsive-modal';
//import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/css/bootstrap.css';

//import AddTaskForm from '../components/addTaskForm.jsx'




//Fix better styling!
const customStyles = {
    modal: {
        border: '1px solid #ccc', background: '#fff',
        overflow: 'auto', WebkitOverflowScrolling: 'touch',
        borderRadius: '4px', outline: 'none', padding: '20px',
        top: '180px', left: '150px', right: '150px', bottom: '190px', position: 'absolute',

    }
};


const addTaskSchema = Yup.object().shape({
    title: Yup.string()
        .required('Required'),
    description: Yup.string()
        .required('Required'),
    estimatedTime: Yup.number()
        .required('Required')
        .positive('Time must be > 0')
        .integer('Time must be integer value'),

});

function EditTaskForm(task, column, finishEditTask) {
    return (
        <div>
            <h1>Edit task</h1>
            <Formik
                initialValues={{
                    title: task.title,
                    description: task.description,
                    estimatedTime: task.estimatedtime
                }}
                validationSchema={addTaskSchema}
                onSubmit={(values, { setSubmitting }) => {
                    var newTask = Object.assign({}, task, {
                        title: values.title,
                        estimatedtime: values.estimatedTime,
                        description: values.description
                    });
                    finishEditTask(newTask, column);
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
                        handleReset,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title" style={{ display: 'block' }}>
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
                                    errors.title && touched.title ? 'text-input error' : 'text-input'
                                }
                            />
                            {errors.title &&
                                touched.title && <div className="input-feedback">{errors.title}</div>}
                            <label htmlFor="description" style={{ display: 'block' }}>
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
                                    errors.description && touched.description ? 'text-input error' : 'text-input'
                                }
                            />
                            {errors.description &&
                                touched.description && <div className="input-feedback">{errors.description}</div>}
                            <label htmlFor="estimatedTime" style={{ display: 'block' }}>
                                Estimated Time
                            </label>
                            <input
                                id="estimatedTime"
                                placeholder="Enter your estimatedTime"
                                type="text"
                                value={values.estimatedTime}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.estimatedTime && touched.estimatedTime ? 'text-input error' : 'text-input'
                                }
                            />
                            {errors.estimatedTime &&
                                touched.estimatedTime && <div className="input-feedback">{errors.estimatedTime}</div>}
                            <button type="submit" className="modalButton">
                                Submit
                            </button>

                        </form>
                    );
                }}
            />
        </div>
    );
}



class EditTaskModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modalApp">
                <Modal
                    open={this.props.modalIsOpen}
                    onClose={this.props.closeEditTask}
                    center
                    focusTrapped
                    styles={customStyles}
                >
                    {EditTaskForm(this.props.task, this.props.column, this.props.finishEditTask)}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        modalIsOpen: state.editVisible,
        task: state.editTask,
        column: state.editColumn
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        startEditTask: startEditTask,
        finishEditTask: finishEditTask,
        closeEditTask: closeEditTask
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditTaskModal);