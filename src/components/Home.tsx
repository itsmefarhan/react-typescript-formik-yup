import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  content: {
    margin: "50px",
  },
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
}));

const Step1Schema = yup.object({
  address: yup.string().label("Address").required().min(6),
});
const Step2Schema = yup.object({
  date: yup.string().label("date").required(),
});
const Step3Schema = yup.object({
  occupation: yup.string().label("occupation").required(),
});

const validationSchema = [Step1Schema, Step2Schema, Step3Schema];

const Home = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const getSteps = () => {
    return ["Address", "Date Of Birth", "Occupation"];
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Field
            name="address"
            label="Address"
            component={TextField}
            className={classes.fields}
          />
        );
      case 1:
        return (
          <Field
            name="date"
            label="Date of birth"
            component={TextField}
            type="date"
            id="date"
            fullWidth
            className={classes.fields}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      case 2:
        return (
          <Field
            select
            name="occupation"
            label="Occupation"
            component={TextField}
            className={classes.fields}
          >
            <MenuItem value="Businessman">Businessman</MenuItem>
            <MenuItem value="Job">Job</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </Field>
        );
      default:
        return "Unknown step";
    }
  };

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (call: any) => {
    setActiveStep(0);
    call();
  };

  const customClick = (call: any) => {
    if (activeStep !== steps.length - 1) {
      handleNext();
    } else {
      handleNext();
      call();
    }
  };

  return (
    <div className={classes.root}>
      <Link to="/">
        <Typography
          variant="h4"
          align="center"
          color="primary"
          // className={classes.header}
        >
          Go Back
        </Typography>
      </Link>
      <Typography
        variant="h4"
        align="center"
        color="primary"
        className={classes.header}
      >
        Multi Step Form
      </Typography>
      <Paper className={classes.paper} elevation={5}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Formik
          initialValues={{
            address: "",
            date: "",
            occupation: "",
          }}
          validationSchema={validationSchema[activeStep]}
          onSubmit={(values, action) => {
            alert(`\nAddress: ${values.address}
              \nDate Of Birth: ${values.date}
              \nOccupation: ${values.occupation}
              `);
          }}
        >
          {(props: any) => (
            <div className={classes.content}>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button
                    onClick={() => handleReset(props.resetForm)}
                    className={classes.button}
                  >
                    Reset
                  </Button>
                </div>
              ) : (
                <Form>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => customClick(props.handleSubmit)}
                      className={classes.button}
                      disabled={
                        (activeStep === 0 && props.values.address === "") ||
                        (activeStep === 1 && props.values.date === "") ||
                        (activeStep === 2 && props.values.occupation === "")
                      }
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          )}
        </Formik>
      </Paper>
    </div>
  );
};
export default Home;
