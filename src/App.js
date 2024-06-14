import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './Component/MovieList';
import MovieListHeading from './Component/MovieListHeading';
import SearchBox from './Component/SearchBox';
import AddFavourite from './Component/AddToFavourites';
import RemoveFavourites from './Component/RemoveFavourites';



const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=19d21846`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

		useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	



	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);

	};

  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	
    
	};

  

	

  




	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList movies={movies} 
         favouriteComponent={AddFavourite} 
         handleFavouritesClick={addFavouriteMovie}
         />
			</div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList movies={favourites}
        handleFavouritesClick={removeFavouriteMovie}
         favouriteComponent={RemoveFavourites} />
			</div>
		</div>
	);
};

export default App;