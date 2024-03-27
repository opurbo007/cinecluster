import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './style.scss';

import PosterFallback from '../../../assets/no-poster.png';
import Rating from '../../../components/circleRating/Rating';
import Wrapper from '../../../components/contentWrapper/Wrapper';
import Genres from '../../../components/genres/Genres';
import Img from '../../../components/lazyLoadImg/Img';
import Popup from '../../../components/popUp/PopUp';
import useFetch from '../../../hooks/useFetch';
import { PlayIcon } from '../PlayIcon';
// import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
   const { mediaType, id } = useParams();
   const { data, loading } = useFetch(`/${mediaType}/${id}`);
   const { url } = useSelector((state) => state.home);
   const _genres = data?.genres?.map((g) => g.id);

   const director = crew?.filter((d) => d.job === 'Director');
   const writer = crew?.filter(
      (w) => w.job === 'Writer' || w.job === 'Screenplay' || w.job === 'Story'
   );

   const [show, setShow] = useState();
   const [videoId, setVideoId] = useState();

   //convert time to H & M
   const toHoursAndMinutes = (totalMiniutes) => {
      const hours = Math.floor(totalMiniutes / 60);
      const minutes = totalMiniutes % 60;
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
   };

   return (
      <div className="detailsBanner">
         {!loading ? (
            <>
               {data && (
                  <>
                     <div className="backdrop-img">
                        <Img src={url.backdrop + data.backdrop_path} />
                     </div>
                     <div className="opacity-layer"></div>
                     <Wrapper>
                        <div className="content">
                           <div className="left">
                              {data.poster_path ? (
                                 <Img
                                    src={url.backdrop + data.poster_path}
                                    className="posterImg"
                                 />
                              ) : (
                                 <Img
                                    src={PosterFallback}
                                    className="posterImg"
                                 />
                              )}
                           </div>
                           <div className="right">
                              <div className="title">
                                 {`${data?.name || data?.title} (${dayjs(
                                    data.release_date
                                 ).format('YYYY')})`}
                              </div>
                              <div className="subtitle">{data?.tagline}</div>
                              <Genres data={_genres} />
                              <div className="row">
                                 <Rating
                                    rating={data?.vote_average.toFixed(1)}
                                 />
                                 <div
                                    className="playbtn"
                                    onClick={() => (
                                       setShow(true), setVideoId(video?.key)
                                    )}
                                 >
                                    <PlayIcon />
                                    <span className="text">Watch Trailer</span>
                                 </div>
                              </div>
                              <div className="overview">
                                 <div className="heading">Overview</div>
                                 <div className="description">
                                    {data?.overview}
                                 </div>
                              </div>
                              <div className="info">
                                 {data?.status && (
                                    <div className="infoItem">
                                       <span className="text bold">
                                          Status:{' '}
                                          <span className="text">
                                             {data?.status}
                                          </span>
                                       </span>
                                    </div>
                                 )}
                                 {data?.release_date && (
                                    <div className="infoItem">
                                       <span className="text bold">
                                          Release Date:{' '}
                                          <span className="text">
                                             {dayjs(data?.release_date).format(
                                                'MMM D, YYYY'
                                             )}
                                          </span>
                                       </span>
                                    </div>
                                 )}{' '}
                                 {data?.runtime && (
                                    <div className="infoItem">
                                       <span className="text bold">
                                          Runtime:{' '}
                                          <span className="text">
                                             {toHoursAndMinutes(data?.runtime)}
                                          </span>
                                       </span>
                                    </div>
                                 )}
                              </div>
                              {director?.length > 0 && (
                                 <div className="info">
                                    <span className="text bold">
                                       Director:{' '}
                                       <span className="text">
                                          {director?.map((d, idx) => (
                                             <span key={idx}>
                                                {d.name}
                                                {director.length - 1 !== idx &&
                                                   ', '}
                                             </span>
                                          ))}
                                       </span>
                                    </span>
                                 </div>
                              )}{' '}
                              {writer?.length > 0 && (
                                 <div className="info">
                                    <span className="text bold">
                                       Writer:{' '}
                                       <span className="text">
                                          {writer?.map((d, idx) => (
                                             <span key={idx}>
                                                {d.name}
                                                {writer.length - 1 !== idx &&
                                                   ', '}
                                             </span>
                                          ))}
                                       </span>
                                    </span>
                                 </div>
                              )}
                              {data?.created_by?.length > 0 && (
                                 <div className="info">
                                    <span className="text bold">
                                       Creator:{' '}
                                       <span className="text">
                                          {data?.created_by?.map((d, idx) => (
                                             <span key={idx}>
                                                {d.name}
                                                {data?.created_by.length - 1 !==
                                                   idx && ', '}
                                             </span>
                                          ))}
                                       </span>
                                    </span>
                                 </div>
                              )}
                           </div>
                        </div>
                        <Popup
                           show={show}
                           setShow={setShow}
                           videoId={videoId}
                           setVideoId={setVideoId}
                        />
                     </Wrapper>
                  </>
               )}
            </>
         ) : (
            <div className="detailsBannerSkeleton">
               <Wrapper>
                  <div className="left skeleton"></div>
                  <div className="right">
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                  </div>
               </Wrapper>
            </div>
         )}
      </div>
   );
};

export default DetailsBanner;
