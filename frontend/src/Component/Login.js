import { Button, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Navigate } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../Redux/Action/action";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { ToastContainer, toast } from 'react-toastify';


export const SigninSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too Short!").required("Required"),
  password: Yup.string().min(2, "Too Short!").required("Required"),
});

class Login extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <>
        <div className="form">
          <ToastContainer/>
        <h2>SignIn </h2>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={SigninSchema}
            onSubmit={async(values ,{resetForm, setSubmitting}) => {
              await this.props.dispatch(login(values))
              setSubmitting(false)
              if(this.props.auth?.error)
                toast.error(this.props.auth?.error, {
                  autoClose: 3000,
                });
            }}
          >
            {({ errors, touched, values, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <div className="form-field">
                  <TextField
                    error={errors.username && touched.username ? true : false}
                    id="username"
                    name="username"
                    label="User Name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.username && touched.username && errors.username}
                  />
                </div>

                <div className="form-field">
                <TextField
                    error={errors.password && touched.password ? true : false}
                    id="password"
                    name="password"
                    label="Password"
                    size="small"
                    type='password'
                    variant="outlined"
                    fullWidth
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.password && touched.password && errors.password}
                  />
                </div>
                <div className="form-field">
                  <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                    Login
                  </LoadingButton>
                </div>
                <p>
                  If you have allReady Account. Please <a href="/register">Register</a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ login });
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
