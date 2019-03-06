// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';


const Basic = () => (
  <div>
    <h2>Add New Task</h2>
    <Formik
        initialValues={{
           first_name: '',
           email_address: '',
           gender: ''
        }}
        validate={(values) => {
          let errors = [];
      
          if(!values.email)
             errors.email = "Email Address Required";
              
             //check if my values have errors
             return errors;
        }}
        onSubmit={this}
        render={formProps => {
          return(
            <Form>
                <p>
                    <Field 
                 type="text" 
                 name="first_name" 
                 placeholder="First Name" 
               /> 
               <ErrorMessage name="first_name" />
                </p>
            
                <p>
                <Field 
                  type="text" 
                  name="email" 
                  placeholder="Email address" 
			         	/> 
                <ErrorMessage name="email" />
                </p>

                <p>
                <Field
                  name="gender" 
                  component="select" 
                  placeholder="Your Gender">   
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                </Field>
                </p>
		
		<ErrorMessage name="gender" />
        
        
        <Button 
        variant="primary"
        type="submit" 
        disabled={formProps.isSubmitting}>
        Create1
        </Button>
                 
                
              </Form>
           );
        }}
     />
  </div>
);

export default Basic;