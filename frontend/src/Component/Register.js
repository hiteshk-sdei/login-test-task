import { Button, TextField } from "@mui/material";
import { Form, Formik, values } from "formik";
import { Navigate , history, Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register, login } from "../Redux/Action/action";
import { SignupSchema } from "../schemaValidation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isRedirect:false
    }
  }

  render() {
    return (
      <>
        {this.state.isRedirect && <Navigate to='/' replace={true}/>}
        <div className="form">
          <ToastContainer />
          <h2>SignUp </h2>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async(values ,{resetForm, setSubmitting}) => {
              await this.props.dispatch(register(values))
              if(this.props.auth?.register?.status === 200){
                toast.success(this.props.auth?.register?.data?.message, {
                  autoClose: 3000,
                });
                const _that = this;
                setTimeout(() => {
                  _that.setState({
                    isRedirect: true
                  })
                  resetForm();
                }, 2000);
              }
              if(this.props.auth?.error){
                toast.error(this.props.auth?.error, {
                  autoClose: 3000,
                });
              }
              
              setSubmitting(false)
              
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
                    value={values.username}
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.username && touched.username && errors.username}
                  />
                </div>

                <div className="form-field">
                  <TextField
                    error={errors.email && touched.email ? true : false}
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                    variant="outlined"
                    value={values.email}
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.email && touched.email && errors.email}
                  />
                </div>

                <div className="form-field">
                <TextField
                    error={errors.password && touched.password ? true : false}
                    id="password"
                    name="password"
                    label="Password"
                    size="small"
                    variant="outlined"
                    type="password"
                    value={values.password}
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.password && touched.password && errors.password}
                  />
                </div>
                <div className="form-field">
                <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                    Register
                  </LoadingButton>
                </div>
                <p>
                  If you have allReady Account. Please <a href="/">Login</a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
        
      </>
    );
  }
}
const mapStateToProps = ((state) =>({auth: state.auth}))


function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({ register });
  return { ...actions, dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
