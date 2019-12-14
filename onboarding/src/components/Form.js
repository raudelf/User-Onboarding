import React, { useState, useEffect } from "react";
import Styles from "styled-components";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Forms = props => {

const [ user, setUser ] = useState([]);

useEffect(() => {
    console.log('Status Change: ', props.status)
    props.status && setUser(users => [...users, props.status]);
}, [props.status]);

  return (
    <div className="user-form">
      <Form>
        <label htmlFor="name">
          Name:
          <Field id="name" type="text" name="name" placeholder="Full Name" />
          {props.touched.name && props.errors.name && (
            <p>{props.errors.name}</p>
          )}
        </label>
        <label htmlFor="email">
          Email:
          <Field id="email" type="text" name="email" placeholder="Email" />
          {props.touched.email && props.errors.email && (
            <p>{props.errors.email}</p>
          )}
        </label>
        <label htmlFor="password">
          Password:
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </label>
        <label className="checkbox-container">
          Terms of Service
          <Field type="checkbox" name="terms" checked={props.values.terms} />
          {props.touched.terms && props.errors.terms && (
            <p>{props.errors.terms}</p>
          )}
        </label>
        <button type="submit">Submit</button>
      </Form>
      {user.map(users => {
          return (
              <div key={users.id} className='user-card'>
              <h2>{users.name}</h2>
              <p>{users.email}</p>
              </div>
          )
      })}
    </div>
  );
};

const FormikForms = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      terms: props.terms || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    terms: Yup.string().required()
  }),

  handleSubmit(values, { setStatus, resetForm }) {
      console.log('Values: ', values)
      axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
          console.log(res);

          setStatus(res.data);
          resetForm();
      })
      .catch(err => {
          console.log('Error: ', err);
      })
  }
})(Forms);
export default FormikForms;
