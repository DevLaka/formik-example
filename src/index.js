/* Reference: https://formik.org/docs/tutorial */
import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./styles.css";

// UseCase
// Instead of managing form values on our own and writing our own custom event
// handlers for every single input, we can just use useFormik().

const SignupForm = () => {
  // Step 1
  // Passing the initial form values and a submit function that will be called
  // when the form is submitted to the useFormik() hook.
  // The useFormik() hook returns the form state and helper methods in a
  // variable called formik.
  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    // Step 4
    // Validation using Yup
    // By default, Formik will validate after each keystroke (change event),
    // each input’s blur event, as well as prior to submission. The onSubmit
    // function we passed to useFormik() will be executed only if there are no errors.
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
  });
  // Step 2
  // Log and see what it returned by useFormik() hook.
  // The most helper methods are;
  // 1. handleSubmit: A submission handler.
  // 2. handleChange: A change handler that we will pass into <input>, <select>,
  //  or <textarea>.
  // 3. values: Form’s current values.
  console.log(formik.touched);

  // Step 3
  // Things to note.
  // 1. We reuse the same change handler function "handleChange" for every HTML input.
  // 2. We pass an id and name HTML attribute that matches the property we
  // defined in initialValues.
  // 3.We access the field’s value using the same name (email -> formik.values.email).
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        // Step 6
        // Since the validation runs on each keystroke against the entire form’s
        // values, the errors object contains all validation errors at any given moment.
        // As a result, it will show error messages for fields that the user hasn’t
        // even visited yet.
        // Formik keeps track of the visited fields in an object called touched.
        // The keys of touched are the field names, and the values are booleans true/false.
        // Example touch object: { "firstName": true, "lastName": true }
        // To take advantage of touched, we pass "formik.handleBlur" to each input’s
        // onBlur prop. This also use the name attribute to figure out which field to update.
        onBlur={formik.handleBlur}
      />
      {/* Step 5 */}
      {/* {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null} */}

      {/* Step 7 (Replaces Step 5)*/}
      {/* After adding touched, we can now change our error message render logic
      to only show a given field’s error message if it exists and if our user has
      visited that field. */}
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        // Step 6
        onBlur={formik.handleBlur}
      />
      {/* Step 5 */}
      {/* {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null} */}

      {/* Step 7 (Replaces Step 5)*/}
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        // Step 6
        onBlur={formik.handleBlur}
      />
      {/* Step 5 */}
      {/* {formik.errors.email ? <div>{formik.errors.email}</div> : null} */}

      {/* Step 7 (Replaces Step 5)*/}
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
