import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
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
        "https://apitut.onrender.com/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      navigate("/signin");

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
      <Header page={"signup"} />
      <section className="job-bg user-page">
        <div className="container  text-center">
          <div className="user-account-content">
            <div className="user-account job-user-account">
              <h2>Create An Account</h2>
              <ul className="nav nav-tabs text-center" role="tablist">
                <li role="presentation">
                  <a
                    className="active"
                    href="#find-job"
                    aria-controls="find-job"
                    role="tab"
                    data-toggle="tab"
                  >
                    Find A Job
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#post-job"
                    aria-controls="post-job"
                    role="tab"
                    data-toggle="tab"
                  >
                    Post A Job
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  role="tabpanel"
                  className="tab-pane active show"
                  id="find-job"
                >
                  <form action="#">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="FirstName"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="LastName"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                      />
                    </div>
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
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="ConfirmPassword"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="button" className="btn" onClick={handleSave}>
                      Registration
                    </button>

                    {/* Display error if there's any */}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Signup;
