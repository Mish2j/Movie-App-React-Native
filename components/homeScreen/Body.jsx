import { useEffect, useState } from "react";

import { Alert } from "react-native";

import { COLORS } from "../../constants/styles";
import { ERROR } from "../../constants/config";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getFilteredMovies,
} from "../../util/http";

import MovieList from "../movie/MovieList";
import MovieCategoryList from "./MovieCategoryList";
import BodyWrapper from "../UI/BodyWrapper";
import Loader from "../UI/Loader";

const Body = () => {
  const [isLoading, setIsloading] = useState(true);
  const [movies, setMovies] = useState({
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
  });

  const [filteredMovies, setFilteredMovies] = useState({
    categoryName: "",
    movies: [],
  });

  const isMoviesFiltered = filteredMovies.movies.length > 0;
  let content;

  useEffect(() => {
    console.log("run");
    const getData = async () => {
      setIsloading(true);
      try {
        const popularMovies = await getPopularMovies();
        const topRatedMovies = await getTopRatedMovies();
        const upcomingMovies = await getUpcomingMovies();
        setMovies({
          popularMovies,
          topRatedMovies,
          upcomingMovies,
        });
      } catch (error) {
        Alert.alert(ERROR.REQUEST_FAILED, "Failed to fetch Movies!");
      } finally {
        setIsloading(false);
      }
    };

    getData();
  }, []);

  const filterMoviesHandler = async (categoryId, catName) => {
    if (categoryId === 1 && catName === "All") {
      setFilteredMovies({ categoryName: "", movies: [] });
      return;
    }

    try {
      setIsloading(true);
      const filteredMoviesData = await getFilteredMovies(categoryId);

      setFilteredMovies({ categoryName: catName, movies: filteredMoviesData });
    } catch (error) {
      Alert.alert(ERROR.REQUEST_FAILED, "Failed to fetch Movies!");
    } finally {
      setIsloading(false);
    }
  };

  if (!isMoviesFiltered) {
    content = (
      <>
        <MovieList
          isLoading={isLoading}
          isHorizontal={true}
          heading="Popular"
          movies={movies.popularMovies}
        />
        <MovieList
          isLoading={isLoading}
          isHorizontal={true}
          heading="Top Rated"
          movies={movies.topRatedMovies}
        />
        <MovieList
          isLoading={isLoading}
          isHorizontal={true}
          heading="Upcoming"
          movies={movies.upcomingMovies}
        />
      </>
    );
  }

  if (isMoviesFiltered) {
    content = (
      <MovieList
        heading={filteredMovies.categoryName}
        movies={filteredMovies.movies}
      />
    );
  }

  if (isLoading) {
    content = <Loader />;
  }

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <MovieCategoryList filterHandler={filterMoviesHandler} />
      {content}
    </BodyWrapper>
  );
};

export default Body;
