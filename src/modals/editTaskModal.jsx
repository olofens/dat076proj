import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { startEditTask, finishEditTask, closeEditTask } from "../actions/index.js"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './modal.css';
import Modal from 'react-responsive-modal';

// Custom Modal styling
const customStyles = {
    modal: {
        border: '1px solid #ccc', background: '#fff',
        overflow: 'auto', WebkitOverflowScrolling: 'touch',
        borderRadius: '4px', outline: 'none', padding: '20px',
        top: '180px', left: '150px', right: '150px', bottom: '190px', position: 'absolute',

    }
};
// Yup - Form validator framework
// The validation scheme which is used in combination with Formik 
// to validate the input data
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
// Formik - Form building framework
// Allows us to easily get values from state, validate the inputs (with Yup) and 
// submit data with ease
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
                    var newTask = task;
                    newTask.title = values.title;
                    newTask.description = values.description;
                    newTask.estimatedtime = values.estimatedTime;
                    fetch("http://127.0.0.1:3000/api/update_task", {
                        method: "post",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(task)
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