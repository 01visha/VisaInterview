import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";

const Myprofile = () => {
  const [resume, setResume] = useState(null);

  const handleFileUpload = (event) => {
    setResume(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Profile updated successfully!");
    console.log("Uploaded resume:", resume);
  };


  const { userData } = useUserContext();

  if (!userData) {
    return <p>Loading user data...</p>;
  }


  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-4">
      <div
        className=""
        style={{
          fontFamily: "auto",
          border: "black",
          backgroundImage:
            "radial-gradient(circle at 0 0, #7dd3fc80, #b464f280 67%)",
          padding: 29,
          borderRadius: 40

        }}
      >
        <img
          src={userData.picture}
          alt="Profile"
          width={50}
          height={50}          
        />
        <span style={{ marginLeft: 32 }}>Welcome! {userData.name}</span>
        <br />
        <span style={{ marginLeft: 51 }}>
          ({userData.email})
        </span>
      </div>
    </div>
    <div className="col-md-7">
      <div className="card shadow">
        <div className="card-header card-header-head text-center">
          <h4>Update Profile</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter your full name"
                required=""              
                defaultValue={userData.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required=""
                defaultValue={userData.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="resume" className="form-label">
                Upload Resume
              </label>
              <input
                type="file"
                className="form-control"
                id="resume"
                accept=".pdf,.doc,.docx"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn mg-ch">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Myprofile;