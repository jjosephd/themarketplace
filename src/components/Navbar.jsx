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
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
const Navbar = () => {
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <NavLink
              to="/"
              style={({ isActive }) => {
                return {
                  fill: isActive ? '#2c2c2c' : '#AAAAAA',
                  color: isActive ? '#2c2c2c' : '#AAAAAA',
                };
              }}
            >
              <ExploreIcon fill="" width="36px" height="36px" />
              <p>Explore</p>
            </NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink
              to="/offers"
              style={({ isActive }) => {
                return {
                  fill: isActive ? '#2c2c2c' : '#AAAAAA',
                  color: isActive ? '#2c2c2c' : '#AAAAAA',
                };
              }}
            >
              <OfferIcon fill="" width="36px" height="36px" />
              <p>Offers</p>
            </NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink
              to="/profile"
              style={({ isActive }) => {
                return {
                  fill: isActive ? '#2c2c2c' : '#AAAAAA',
                  color: isActive ? '#2c2c2c' : '#AAAAAA',
                };
              }}
            >
              <PersonOutlineIcon fill="" width="36px" height="36px" />
              <p>Profile</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
