import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../../components/contentWrapper/Wrapper';
import Img from '../../../components/lazyLoadImg/Img';
import useFetch from '../../../hooks/useFetch';
import './style.scss';

const HeroBanner = () => {
   const [bg, setBg] = useState('');
   const [query, setquery] = useState('');
   const navigate = useNavigate();

   const { data, loading } = useFetch('/movie/upcoming');

   const { url } = useSelector((state) => state.home);

   const handleKeyPres = (e) => {
      if (e.key === 'Enter') {
         searchHandler();
      }
   };
   const searchHandler = () => {
      if (query.length > 0) {
         navigate(`/search/${query}`);
      }
   };

   useEffect(() => {
      const background =
         url.backdrop +
         data?.results?.[Math.floor(Math.random() * data.results.length) - 1]
            ?.backdrop_path;
      setBg(background);
   }, [data]);

   return (
      <div className="heroBanner">
         {!loading && (
            <div className="backdrop-img">
               <Img src={bg} />
            </div>
         )}
         <div className="opacity-layer"></div>
         <Wrapper>
            <div className="wrapper">
               <div className="heroBannerContent">
                  <span className="title">Welcome</span>
                  <span className="subTitle">
                     Millions of Movies, TV shows and people to discover.
                     Explore now
                  </span>
                  <div className="searchInput">
                     <input
                        type="text"
                        className="input"
                        placeholder="Search for a movie or tv show..."
                        onChange={(e) => setquery(e.target.value)}
                        onKeyUp={handleKeyPres}
                     />
                     <button onClick={searchHandler}>Search</button>
                  </div>
               </div>
            </div>
         </Wrapper>
      </div>
   );
};

export default HeroBanner;
