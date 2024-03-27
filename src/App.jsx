import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import NotFound from './pages/404/NotFound';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import Home from './pages/home/Home';
import SearchResult from './pages/searchResult/SearchResult';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import fetchDataFromApi from './utils/api';

function App() {
   const dispatch = useDispatch();
   const { url } = useSelector((state) => state.home);

   const apiConfig = () => {
      fetchDataFromApi('/configuration').then((data) => {
         const url = {
            backdrop: data.images.secure_base_url + 'original',
            poster: data.images.secure_base_url + 'original',
            profile: data.images.secure_base_url + 'original',
         };
         dispatch(getApiConfiguration(url));
      });
   };

   useEffect(() => {
      apiConfig();
      genresCall();
   }, []);

   // fectch both movies and tv shows

   const genresCall = async () => {
      try {
         let promises = [];
         let endpoints = ['tv', 'movie'];
         let allgenres = {};

         endpoints.forEach((name) => {
            promises.push(fetchDataFromApi(`/genre/${name}/list`));
         });

         const data = await Promise.all(promises);

         // console.log(data);

         data?.map((gen) => {
            return gen?.genres?.map((item) => (allgenres[item.id] = item));
         });
         dispatch(getGenres(allgenres));
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <BrowserRouter>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/:mediaType/:id" element={<Details />} />

            <Route path="/search/:query" element={<SearchResult />} />

            <Route path="/explore/:mediaType" element={<Explore />} />

            <Route path="*" element={<NotFound />} />
         </Routes>
         <Footer />
      </BrowserRouter>
   );
}

export default App;
