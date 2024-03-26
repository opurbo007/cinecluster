import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import NotFound from './pages/404/NotFound';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import Home from './pages/home/Home';
import SearchResult from './pages/searchResult/SearchResult';
import { getApiConfiguration } from './store/homeSlice';
import fetchDataFromApi from './utils/api';
function App() {
   const dispatch = useDispatch();
   const { url } = useSelector((state) => state.home);

   useEffect(() => {
      apiConfig();
   }, []);

   const apiConfig = () => {
      fetchDataFromApi('/configuration').then((data) => {
         console.log(data);
         const url = {
            backdrop: data.images.secure_base_url + 'original',
            poster: data.images.secure_base_url + 'original',
            profile: data.images.secure_base_url + 'original',
         };
         dispatch(getApiConfiguration(url));
      });
   };
   console.log('hello world!');
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
         {/* <Footer /> */}
      </BrowserRouter>
   );
}

export default App;
