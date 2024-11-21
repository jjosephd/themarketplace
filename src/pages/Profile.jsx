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
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * The Profile component renders a page containing the logged-in
 * user's information and a button to log them out.
 *
 * @returns {JSX.Element} The Profile component.
 */
const Profile = () => {
  // Get the auth object.
  const auth = getAuth();
  // Get the current user.
  const [form, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeDetails, setChangeDetails] = useState(false);

  // Destructure the form state.
  const { name, email } = form;

  // Get the navigate function from react-router-dom.
  const navigate = useNavigate();
  /**
   * The onLogout function logs the user out and navigates
   * them to the home page.
   */
  const onLogout = () => {
    // Sign the user out.
    auth.signOut();
    // Navigate to the home page.
    navigate('/');
    // Toast a message letting them know they've been logged out.
    toast.success('Logout Successful!', {
      position: 'top-center',
      autoClose: 2500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName != name) {
        await updateProfile(auth.currentUser, { displayName: name });
        //Update in Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {
      toast.error('Unable to update profile details');
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // Return the JSX for the Profile component.
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              // Call the onSubmit function if the user is trying to change their details.
              changeDetails && onSubmit();
              // Toggle the changeDetails state variable.
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {/* If the user is trying to change their details, show "Done", otherwise show "Change". */}
            {changeDetails ? 'Done' : 'Change'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
