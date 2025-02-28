import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./../components/BackButton";
import "./SignIn.css";

export default function SignUpSignInPage({ setIsSignedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state, navigate);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    const yearOfBirth = parseInt(formData.dob.split("-")[0]);

    console.log(trimmedFirstName);
    console.log(
      trimmedEmail.includes("@"),
      "tady",
      !trimmedEmail,
      trimmedEmail
    );

    if (isSignUp && !trimmedFirstName) {
      newErrors.firstName = "Name is required";
    } else if (isSignUp && !/^[a-zA-Z\s]+$/.test(trimmedFirstName)) {
      newErrors.firstName = "Name can only contain letters";
    } else if (isSignUp && trimmedFirstName.length < 2) {
      newErrors.firstName = "Name is required to have at least two characters";
    }

    if (isSignUp && !trimmedLastName) {
      newErrors.lastName = "Surname is required";
    } else if (isSignUp && !/^[a-zA-Z\s]+$/.test(trimmedLastName)) {
      newErrors.lastName = "Surname can only contain letters";
    } else if (isSignUp && trimmedLastName.length < 2) {
      newErrors.lastName =
        "Surname is required to have at least two characters";
    }
    if (isSignUp && !formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (yearOfBirth < 1940)
      newErrors.dob = "Year of birth cannot be less than 1940.";
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      newErrors.email = "Invalid email format, it should be xxx@xxx.xx";
    }
    if (!trimmedPassword) {
      newErrors.password = "Password is required";
    } else if (trimmedPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const firstNameHandler = (e) => {
    setFormData((prev) => ({ ...prev, firstName: e.target.value }));
  };

  const handleSubmit = (e) => {
    console.log("asdsd");
    e.preventDefault();
    let cleanedData = {};
    if (!validateForm()) {
      return;
    }
    if (validateForm()) {
      cleanedData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        token: 1,
      };
    }
    if (isSignUp) {
      console.log("Sign Up successful:", cleanedData);
      //   alert("Account created successfully!");
      localStorage.setItem("account", JSON.stringify(cleanedData));
      localStorage.setItem("loggedin", cleanedData.token);
    } else {
      console.log("Sign In successful:", cleanedData);
      //   alert("Signed in successfully!");
    }

    setIsSignedIn();
    if (!location.state.page) {
      navigate("/more");
    } else {
      navigate(`${location.state.page}`);
    }
  };

  const toggleForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
    });
    setErrors({});
    setIsSignUp(!isSignUp);
  };

  // const handlePaste = (e) => {
  //   e.preventDefault();
  //   const pastedText = e.clipboardData.getData("text").trim();

  //   // Podporované formáty: dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd
  //   let formattedDate = pastedText.replace(/[^\d]/g, ""); // Odebere nečíselné znaky

  //   if (formattedDate.length === 8) {
  //     let day, month, year;

  //     // Detekce formátu podle pozice roku
  //     if (formattedDate.substring(4, 8) > "1900") {
  //       // yyyy-mm-dd
  //       year = formattedDate.substring(0, 4);
  //       month = formattedDate.substring(4, 6);
  //       day = formattedDate.substring(6, 8);
  //     } else {
  //       // dd-mm-yyyy nebo dd/mm/yyyy
  //       day = formattedDate.substring(0, 2);
  //       month = formattedDate.substring(2, 4);
  //       year = formattedDate.substring(4, 8);
  //     }

  //     // Ověření platnosti data
  //     if (
  //       parseInt(month) > 0 &&
  //       parseInt(month) <= 12 &&
  //       parseInt(day) > 0 &&
  //       parseInt(day) <= 31
  //     ) {
  //       const formatted = `${year}/${month}/${day}`; // Nastavení pro `<input type="date">`
  //       setFormData((prev) => ({
  //         ...prev,
  //         dob: formatted,
  //       }));
  //     }
  //   }
  // };

  const titleAuth = isSignUp ? "Sign Up" : "Sign In";

  return (
    <>
      <BackButton title={titleAuth} />
      <div className="auth-page">
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={firstNameHandler}
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  min="1940-01-01"
                  max="2010-01-01"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  // onPaste={handlePaste}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit" className="auth-btn">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="auth-toogle">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="toggle-link" onClick={toggleForm}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </>
  );
}
