import React, { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';
import Wrapper from '../../../components/contentWrapper/Wrapper';
import SwitchTab from '../../../components/switchTab/SwitchTab';
import useFetch from '../../../hooks/useFetch';

const TopRated = () => {
   const [endpoint, setEndpoint] = useState('movie');
   const { data, loading } = useFetch(`/${endpoint}/top_rated`);

   const onTabClick = (tab) => {
      setEndpoint(tab === 'Movie' ? 'movie' : 'tv');
   };
   return (
      <div className="carouselSection">
         <Wrapper>
            <span className="carouselTitle">Top Rated</span>
            <SwitchTab data={['Movie', 'TV shows']} onTabClick={onTabClick} />
         </Wrapper>
         <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      </div>
   );
};

export default TopRated;
