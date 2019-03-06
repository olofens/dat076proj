// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';


const Basic = () => (
  <div>
    <h2>Add New Task</h2>
    <Formik
        initialValues={{
            title: '',
           description: '',
           estimatedTime: ''
        }}
        validate={(values) => {
          let errors = [];
      
          if(!values.email)
             errors.email = "Email Address Required";
              
             //check if my values have errors
             return errors;
        }}
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
               <ErrorMessage name="first_name" />
                </p>
            
                <p>
                <Field 
                  type="text" 
                  name="estimatedTime" 
                  placeholder="Estimated Time" 
			         	/> 
                <ErrorMessage name="estimated_time" />
                </p>

                <p>
                <Field component="textarea"
                  type="text" 
                  name="description" 
                  placeholder="Task Description" 
			         	/> 
                <ErrorMessage name="estimated_time" />
                </p>
		
        <Button 
        variant="primary"
        type="submit" >
        Add Task
        </Button>
                 
                
              </Form>
           );
        }}
     />
  </div>
);




export default Basic;