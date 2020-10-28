import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Button, Paper, Typography, Grid, Container } from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

const validationSchema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(3),
  confirmPassword: yup
    .string()
    .label("confirm password")
    .oneOf([yup.ref("password"), ""], "Password must match")
    .required(),
});

const useStyles = makeStyles(() => ({
  header: {
    margin: "50px",
  },
  paper: {
    maxWidth: "700px",
    margin: "auto",
    padding: "30px",
  },
  fields: {
    width: "100%",
    marginBottom: "10px",
  },
  btn: {
    textAlign: "center",
    marginTop: "30px",
  },
}));

const Signup = ({ history }: any) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const customClick = (call: any) => {
    call();
  };

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        color="primary"
        className={classes.header}
      >
        Formik with Yup
      </Typography>
      <Paper elevation={5} className={classes.paper}>
        <Typography variant="h5" align="center" color="textSecondary">
          Create An Account
        </Typography>
        <Typography variant="caption" align="center" color="error">
          Just a formik and yup demo. Form data will not be stored
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, action) => {
            setLoading(true);
            setTimeout(() => {
              console.log(values);
              action.resetForm();
              setLoading(false);
              history.push(`/home`);
            }, 1000);
          }}
        >
          {(props) => (
            <Form autoComplete="off">
              <Field
                name="name"
                label="Name"
                component={TextField}
                className={classes.fields}
              />
              <Field
                name="email"
                label="Email"
                component={TextField}
                className={classes.fields}
              />
              <Grid container>
                <Grid item sm={5} xs={12}>
                  <Field
                    name="password"
                    type="password"
                    label="Password"
                    component={TextField}
                    className={classes.fields}
                  />
                </Grid>
                <Grid item sm={2} />
                <Grid item sm={5} xs={12}>
                  <Field
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    component={TextField}
                    className={classes.fields}
                  />
                </Grid>
              </Grid>
              <div className={classes.btn}>
                <Button
                  onClick={() => customClick(props.handleSubmit)}
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Registering" : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Signup;
