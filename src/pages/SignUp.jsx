// Copyright 2024 Jordan Daniel
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  /**
   * Handles the form submission by creating a new user with email and password,
   * updating the user's display name, creating a new document in the 'users' collection
   * with the user's data, and redirecting the user to the homepage.
   * @param {Event} e - The form submission event.
   */
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new user with email and password
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user from the userCredential
      const user = userCredential.user;

      // Set the display name of the user
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // Create a copy of the formData object
      const formDataCopy = { ...formData };

      // Remove the password field from the formDataCopy object
      delete formDataCopy.password;

      // Add the timestamp field to the formDataCopy object
      formDataCopy.timestamp = serverTimestamp();

      // Create a new document in the 'users' collection with the user's data
      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      // Redirect the user to the homepage
      navigate('/');
    } catch (error) {
      // Log the error to the console
      console.log(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up Today</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="E-Mail"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="Show Password"
                className="showPassword"
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password?
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          {/* Google OAuth */}

          <Link to="/sign-in" className="registerLink">
            Already Registered? Sign In
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignUp;
