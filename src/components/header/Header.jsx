import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/showboxlogo.png';
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

   //show hide search & mobile menu
   const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
   };
   const openMobileMenu = () => {
      setMobileMenu(true);
      setShowSearch(false);
   };

   //handle search on click

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

   //catagory search
   const navigationHandler = (type) => {
      if (type === 'movie') {
         navigate('/explore/movie');
      } else {
         navigate('/explore/tv');
      }
      setMobileMenu(false);
   };

   //show hide navbar on scroll
   const controlNavbar = () => {
      if (window.scrollY > 200) {
         if (window.scrollY > lastScrollY && !mobileMenu) {
            setShow('hide');
         } else {
            setShow('show');
         }
      } else {
         setShow('top');
      }
      setLastScrollY(window.scrollY);
   };

   useEffect(() => {
      window.addEventListener('scroll', controlNavbar);

      return () => window.removeEventListener('scroll', controlNavbar);
   }, [lastScrollY]);

   //reset scroll to top on page change

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location]);

   return (
      <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
         <Wrapper>
            <div className="logo">
               <Link to={'/'}>
                  <img src={logo} alt="logo" />
               </Link>
            </div>
            <ul className="menuItems">
               <li
                  className="menuItem"
                  onClick={() => navigationHandler('movie')}
               >
                  Movies
               </li>
               <li className="menuItem" onClick={() => navigationHandler('tv')}>
                  Tv Shows
               </li>
               <li className="menuItem">
                  <HiOutlineSearch onClick={openSearch} />
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
