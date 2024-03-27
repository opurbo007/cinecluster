import dayjs from 'dayjs';
import React, { useRef } from 'react';
import {
   BsFillArrowLeftCircleFill,
   BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Rating from '../circleRating/Rating';
import Wrapper from '../contentWrapper/Wrapper';
import Genres from '../genres/Genres';
import Img from '../lazyLoadImg/Img';
import './style.scss';

const Carousel = ({ data, loading, endpoint }) => {
   const carouselContainer = useRef();
   const { url } = useSelector((state) => state.home);
   const navigate = useNavigate();

   // scroll with arrow

   const navigation = (dir) => {
      const container = carouselContainer.current;
      const scrollAmount =
         dir === 'left'
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
   };

   // skeleton
   const renderSkeleton = () => {
      return (
         <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
               <div className="title skeleton"></div>
               <div className="date skeleton"></div>
            </div>
         </div>
      );
   };

   return (
      <div className="carousel">
         <Wrapper>
            <BsFillArrowLeftCircleFill
               className="carouselLeftNav arrow"
               onClick={() => navigation('left')}
            />
            <BsFillArrowRightCircleFill
               className="carouselRighttNav arrow"
               onClick={() => navigation('right')}
            />

            {!loading ? (
               <div className="carouselItems" ref={carouselContainer}>
                  {data &&
                     data.map((item) => {
                        const posterUrl = item.poster_path
                           ? url.poster + item.poster_path
                           : PosterFallback;

                        return (
                           <div
                              key={item.id}
                              className="carouselItem"
                              onClick={() =>
                                 navigate(
                                    `/${item.media_type || endpoint}/${item.id}`
                                 )
                              }
                           >
                              <div className="posterBlock">
                                 <Img src={posterUrl} />
                                 <Rating
                                    rating={item.vote_average.toFixed(1)}
                                 />
                                 <Genres data={item.genre_ids} />
                              </div>
                              <div className="textBlock">
                                 <span className="title">
                                    {item.title || item.name}
                                 </span>
                                 <span className="date">
                                    {dayjs(item.release_Date).format(
                                       'MMM D, YYYY'
                                    )}
                                 </span>
                              </div>
                           </div>
                        );
                     })}
               </div>
            ) : (
               <div className="loadingSkeleton">
                  {renderSkeleton()}
                  {renderSkeleton()}
                  {renderSkeleton()}
                  {renderSkeleton()}
                  {renderSkeleton()}
               </div>
            )}
         </Wrapper>
      </div>
   );
};

export default Carousel;
