// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const addTaskSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required'),
  description: Yup.string()
    .required('Required'),
  estimatedTime: Yup.string()
    .required('Required'),
});

const addTaskForm = () => (
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
        return (
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




export default addTaskForm;