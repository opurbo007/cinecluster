import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

import './style.scss';

import Wrapper from '../../components/contentWrapper/Wrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import useFetch from '../../hooks/useFetch';
import fetchDataFromApi from '../../utils/api';

const Explore = () => {
   const [data, setData] = useState(null);
   const [pageNum, setPageNum] = useState(1);
   const [loading, setLoading] = useState(false);
   const [selectedGenres, setSelectedGenres] = useState([]);
   const [sortby, setSortby] = useState(null);
   const { mediaType } = useParams();

   const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

   const fetchInitialData = () => {
      setLoading(true);

      let genreIds = selectedGenres.map((genre) => genre.value).join(',');
      let apiUrl = `/discover/${mediaType}?with_genres=${genreIds}`;
      if (sortby) {
         apiUrl += `&sort_by=${sortby.value}`;
      }

      fetchDataFromApi(apiUrl).then((res) => {
         setData(res);
         setPageNum((prevPageNum) => prevPageNum + 1);
         setLoading(false);
      });
   };

   const fetchNextPageData = () => {
      const nextPageUrl = `/discover/${mediaType}?page=${pageNum}`;
      fetchDataFromApi(nextPageUrl).then((res) => {
         if (data?.results) {
            setData({
               ...data,
               results: [...data.results, ...res.results],
            });
         } else {
            setData(res);
         }
         setPageNum((prevPageNum) => prevPageNum + 1);
      });
   };

   const handleGenreChange = (selectedItems) => {
      setSelectedGenres(selectedItems);
   };

   const handleSortbyChange = (selectedItem) => {
      setSortby(selectedItem);
   };

   useEffect(() => {
      fetchInitialData();
   }, [mediaType, selectedGenres, sortby]);

   return (
      <div className="explorePage">
         <Wrapper>
            <div className="pageHeader">
               <div className="pageTitle">
                  {mediaType === 'tv' ? 'Explore TV Shows' : 'Explore Movies'}
               </div>
               <div className="filters">
                  <Select
                     isMulti
                     name="genres"
                     value={selectedGenres}
                     options={genresData?.genres.map((genre) => ({
                        value: genre.id,
                        label: genre.name,
                     }))}
                     onChange={handleGenreChange}
                     placeholder="Select genres"
                     className="react-select-container genresDD"
                     classNamePrefix="react-select"
                  />
                  <Select
                     name="sortby"
                     value={sortby}
                     options={[
                        {
                           value: 'popularity.desc',
                           label: 'Popularity Descending',
                        },
                        {
                           value: 'popularity.asc',
                           label: 'Popularity Ascending',
                        },
                        {
                           value: 'vote_average.desc',
                           label: 'Rating Descending',
                        },
                        {
                           value: 'vote_average.asc',
                           label: 'Rating Ascending',
                        },
                        {
                           value: 'primary_release_date.desc',
                           label: 'Release Date Descending',
                        },
                        {
                           value: 'primary_release_date.asc',
                           label: 'Release Date Ascending',
                        },
                        { value: 'original_title.asc', label: 'Title (A-Z)' },
                     ]}
                     onChange={handleSortbyChange}
                     isClearable={true}
                     placeholder="Sort by"
                     className="react-select-container sortbyDD"
                     classNamePrefix="react-select"
                  />
               </div>
            </div>
            {loading && <Spinner initial={true} />}
            {!loading && (
               <>
                  {data?.results?.length > 0 ? (
                     <InfiniteScroll
                        className="content"
                        dataLength={data.results.length}
                        next={fetchNextPageData}
                        hasMore={pageNum <= data.total_pages}
                        loader={<Spinner />}
                     >
                        {data.results.map((item, index) => (
                           <MovieCard
                              key={index}
                              data={item}
                              mediaType={mediaType}
                           />
                        ))}
                     </InfiniteScroll>
                  ) : (
                     <span className="resultNotFound">
                        Sorry, Results not found!
                     </span>
                  )}
               </>
            )}
         </Wrapper>
      </div>
   );
};

export default Explore;
