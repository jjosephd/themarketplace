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
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import GoogleIcon from '../assets/svg/googleIcon.svg';

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      //if user doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        progress: undefined,
      });
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/signin' ? 'in' : 'up'} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img src={GoogleIcon} alt="Google Icon" className="socialIconImg" />
      </button>
    </div>
  );
};

export default OAuth;
