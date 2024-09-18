import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      console.log("Submitting form:", formData);

      const response = await axios.post(
        "https://apitut.onrender.com/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      navigate("/");

      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      if (error.response) {
        // The server responded with a status code other than 2xx
        console.error("Error Response:", error.response.data);
        setError(
          error.response.data.message ||
            "An error occurred during registration."
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setError("No response from server. Please try again.");
      } else {
        // Something else went wrong during the request
        console.error("Error:", error.message);
        setError("An unexpected error occurred.");
      }
    }
  };
  return (
    <div>
      <Header page={"signin"} />
      <section className="clearfix job-bg user-page">
        <div className="container text-center">
          <div className="user-account-content">
            <div className="user-account">
              <h2>User Login</h2>

              <form action="#">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Id"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                  />
                </div>
                <button type="button" className="btn" onClick={handleSave}>
                  Login
                </button>
                {/* Display error if there's any */}
                {error && <p style={{ color: "red" }}>{error}</p>}
              </form>

              <div className="user-option">
                <div className="checkbox pull-left">
                  <label for="logged">
                    <input type="checkbox" name="logged" id="logged" /> Keep me
                    logged in{" "}
                  </label>
                </div>
                <div className="pull-right forgot-password">
                  <a href="#">Forgot password</a>
                </div>
              </div>
            </div>
            <a href="/signup" className="btn-primary">
              Create a New Account
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Signin;
