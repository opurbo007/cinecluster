import React, { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';
import Wrapper from '../../../components/contentWrapper/Wrapper';
import SwitchTab from '../../../components/switchTab/SwitchTab';
import useFetch from '../../../hooks/useFetch';
const Tranding = () => {
   const [endpoint, setEndpoint] = useState('day');
   const { data, loading } = useFetch(`/trending/all/${endpoint}`);

   const onTabClick = (tab) => {
      setEndpoint(tab === 'Day' ? 'day' : 'week');
   };
   return (
      <div className="carouselSection">
         <Wrapper>
            <span className="carouselTitle">Tranding</span>
            <SwitchTab data={['Day', 'Week']} onTabClick={onTabClick} />
         </Wrapper>
         <Carousel data={data?.results} loading={loading} />
      </div>
   );
};

export default Tranding;
