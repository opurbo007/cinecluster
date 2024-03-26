import React, { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/movix-logo.svg';
import Wrapper from '../contentWrapper/Wrapper';
import './style.scss';

const Header = () => {
   const [show, setShow] = useState('top');
   const [lastScrollY, setLastScrollY] = useState(0);
   const [mobileMenu, setMobileMenu] = useState(false);
   const [query, setquery] = useState('');
   const [showSearch, setShowSearch] = useState('');
   const navigate = useNavigate();
   const location = useLocation();

   const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
   };
   const openMobileMenu = () => {
      setMobileMenu(true);
      setShowSearch(false);
   };
   const handleKeyPres = (e) => {
      if (e.key === 'Enter') {
         searchHandler();
      }
   };
   const searchHandler = () => {
      if (query.length > 0) {
         navigate(`/search/${query}`);
         setTimeout(() => {
            setShowSearch(false);
         }, 1000);
      }
   };

   const navigationHandler = () => {};

   return (
      <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
         <Wrapper>
            <div className="logo">
               <img src={logo} alt="logo" />
            </div>
            <ul className="menuItems">
               <li className="menuItem">Movies</li>
               <li className="menuItem">Tv Shows</li>
               <li className="menuItem">
                  <HiOutlineSearch />
               </li>
            </ul>
            <div className="mobileMenuItems">
               <HiOutlineSearch onClick={openSearch} />
               {mobileMenu ? (
                  <VscChromeClose onClick={() => setMobileMenu(false)} />
               ) : (
                  <SlMenu onClick={openMobileMenu} />
               )}
            </div>
         </Wrapper>
         {showSearch && (
            <div className="searchBar">
               <Wrapper>
                  <div className="searchInput">
                     <input
                        type="text"
                        className="input"
                        placeholder="Search for a movie or tv show..."
                        onChange={(e) => setquery(e.target.value)}
                        onKeyUp={handleKeyPres}
                     />
                     <VscChromeClose
                        onClick={() => {
                           setShowSearch(false);
                        }}
                     />
                  </div>
               </Wrapper>
            </div>
         )}
      </header>
   );
};

export default Header;
