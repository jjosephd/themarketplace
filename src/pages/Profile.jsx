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
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const [form, formData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate('/');
    toast.success('Logout Successful!', {
      position: 'top-center',
      autoClose: 2500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  );
};

export default Profile;
