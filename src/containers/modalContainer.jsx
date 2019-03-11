import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { showModal, hideModal } from "../actions/index.js"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './modalStyling.css'

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
        top: '50%', left: '50%', right: 'auto', bottom: 'auto',
        marginRight: '-50%', transform: 'translate(-50%, -50%)',
      }
  };


  const addTaskSchema = Yup.object().shape({
    title: Yup.string()
      .required('Required'),
    description: Yup.string() 
      .required('Required'),
    estimatedTime: Yup.string()
      .required('Required'),
  });
  
  const AddTaskForm = () => (
    <div>
      <h2>Add New Task</h2>
      <Formik
          initialValues={{
              title: '',
             description: '',
             estimatedTime: ''
          }}
          validationSchema={addTaskSchema}
          onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                fetch("http://127.0.0.1:3000/add_task", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  
    //make sure to serialize your JSON body
    body: JSON.stringify(values, null, 2)
  })
  
                setSubmitting(false);
              }, 500);
            }}
  
          render={formProps => {
            return(
              <Form>
                  <p>
                  <Field 
                   type="text" 
                   name="title" 
                   placeholder="Title" 
                 /> 
                 <ErrorMessage name="title" />
                  </p>
              
                  <p>
                  <Field 
                    type="text" 
                    name="estimatedTime" 
                    placeholder="Estimated Time" 
                           /> 
                  <ErrorMessage name="estimatedTime" />
                  </p>
  
                  <p>
                  <Field component="textarea"
                    type="text" 
                    name="description" 
                    placeholder="Task Description" 
                           /> 
                  <ErrorMessage name="description" />
                  </p>
          
          <button 
          type="submit" >
          Add Task
          </button>
                   
                </Form>
             );
          }}
       />
    </div>
  );


class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <div className="Modal">
                <Modal
                    open={this.props.modalIsOpen}
                    onClose={this.props.hideModal}
                    center
                    focusTrapped
                    classNames={{
                        overlay: styles.customOverlay,
                        modal: styles.customModal,
                    }}
                    >
                    <h2>
                        <AddTaskForm/>
                    </h2>
                </Modal>
           </div> 
        );
    }
}

function mapStateToProps(state) {
    return {
        modalIsOpen: state.modalIsOpen
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ showModal: showModal,
                                hideModal: hideModal }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ModalContainer);