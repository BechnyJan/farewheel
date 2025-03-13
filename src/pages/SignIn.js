import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./../components/BackButton";
import "./SignIn.css";

export default function SignUpSignInPage({ setIsSignedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
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

    const yearOfBirth = parseInt(formData.dob.split("/")[2]);

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

  const handlePaste = (e) => {
    e.preventDefault();
    let text = e.clipboardData.getData("text").trim().replace(/[^\d]/g, "");

    if (text.length === 8) {
      text = `${text.slice(0, 2)}/${text.slice(2, 4)}/${text.slice(4)}`;
      setFormData((prev) => ({ ...prev, dob: text }));
    }

    const dateRegex = /(\d{1,4})[\/\-.](\d{1,2})[\/\-.](\d{1,4})/;
    const match = text.match(dateRegex);

    if (!match) return;
    let [_, part1, part2, part3] = match;

    let day, month, year;

    if (part1.length === 4) {
      year = part1;
      month = part2.padStart(2, "0");
      day = part3.padStart(2, "0");
    } else {
      day = part1.padStart(2, "0");
      month = part2.padStart(2, "0");
      year = part3;
    }

    const formattedDate = `${day}/${month}/${year}`;
    setFormData((prev) => ({ ...prev, dob: formattedDate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const cleanedData = { ...formData, email: formData.email.trim(), token: 1 };

    if (isSignUp) {
      localStorage.setItem("account", JSON.stringify(cleanedData));
      localStorage.setItem("loggedin", cleanedData.token);
    } else {
      const mockAccount = {
        firstName: "Mark",
        lastName: "Tester",
        email: formData.email.trim(),
        token: 1,
      };
      localStorage.setItem("account", JSON.stringify(mockAccount));
      localStorage.setItem("loggedin", "1");
    }

    setIsSignedIn();
    navigate(location.state?.page || "/more");
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

  const titleAuth = isSignUp ? "Sign Up" : "Sign In";

  const handleDobChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value.length > 8) {
      return;
    }

    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    if (value.length >= 5) {
      value = `${value.slice(0, 5)}/${value.slice(5)}`;
    }

    setFormData((prev) => ({ ...prev, dob: value }));
  };

  return (
    <>
      <BackButton title={titleAuth} />
      <div className="auth-page">
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <>
              {["firstName", "lastName"].map((field) => (
                <div key={field} className="form-group">
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace("Name", " Name")}
                  </label>
                  <input
                    type="text"
                    id={field}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                  {errors[field] && <p className="error">{errors[field]}</p>}
                </div>
              ))}
              <div className="form-group">
                <label htmlFor="dob">Date of Birth (dd/mm/yyyy)</label>
                <input
                  type="text"
                  id="dob"
                  placeholder="dd/mm/yyyy"
                  value={formData.dob}
                  onChange={handleDobChange}
                  onPaste={handlePaste}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
            </>
          )}
          {["email", "password"].map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
              {errors[field] && <p className="error">{errors[field]}</p>}
            </div>
          ))}
          <button type="submit" className="auth-btn">
            {titleAuth}
          </button>
        </form>
        <p className="auth-toggle">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="toggle-link" onClick={toggleForm}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </>
  );
}
