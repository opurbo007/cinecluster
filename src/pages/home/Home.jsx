import React from 'react';
import HeroBanner from './heroBanner/HeroBanner';
import Popular from './popular/Popular';
import './style.scss';
import TopRated from './topRated/TopRated';
import Tranding from './tranding/Tranding';

const Home = () => {
   return (
      <div className="homePage">
         <HeroBanner />
         <Tranding />
         <Popular />
         <TopRated />
      </div>
   );
};

export default Home;
