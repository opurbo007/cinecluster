import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Recommendation from './casrousels/Recommendation';
import Similer from './casrousels/Similer';
import Cast from './cast/Cast';
import DetailsBanner from './detailsBanner/DetailsBanner';
import VideosSection from './videoSection/VideoSection';

const Details = () => {
   const { mediaType, id } = useParams();
   const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
   const { data: credits, loading: creditsLoading } = useFetch(
      `/${mediaType}/${id}/credits`
   );
   return (
      <div>
         <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
         <Cast data={credits?.cast} loading={creditsLoading} />
         <VideosSection data={data} loading={loading} />
         <Similer mediaType={mediaType} id={id} />
         <Recommendation mediaType={mediaType} id={id} />
      </div>
   );
};

export default Details;
