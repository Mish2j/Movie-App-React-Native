import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../constants/styles";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getFilteredMovies,
} from "../util/http";

import MovieList from "../components/movie/MovieList";
import BodyWrapper from "../components/UI/BodyWrapper";
import MovieCategoryList from "../components/movie/MovieCategoryList";

const HomeScreen = () => {
  const [movies, setMovies] = useState({
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
  });
  const [filteredMovies, setFilteredMovies] = useState({
    categoryName: "",
    movies: [],
  });

  // HANDLE ALL MOVIES (DEFAULT)
  useEffect(() => {
    if (filteredMovies.movies.length > 0) return;

    const getData = async () => {
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
        console.log(error);
      }
    };

    getData();
  }, [filteredMovies.movies.length]);

  // HANDLE FILTERED MOVIES
  const filterMoviesHandler = async (categoryId, catName) => {
    if (categoryId === 1 && catName === "All") {
      setFilteredMovies({ categoryName: "", movies: [] });
      return;
    }

    try {
      const filteredMoviesData = await getFilteredMovies(categoryId);

      setFilteredMovies({ categoryName: catName, movies: filteredMoviesData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View>
        <ImageBackground
          style={styles.image}
          source={require("../assets/movie-background.jpg")}
          resizeMode="cover"
        >
          <Text style={styles.imageText}>
            Watch Your Favorite Movies Anywhere
          </Text>
        </ImageBackground>
      </View>
      <BodyWrapper color={COLORS.primaryDark}>
        <MovieCategoryList filterHandler={filterMoviesHandler} />
        {filteredMovies.movies.length === 0 && (
          <>
            <MovieList
              isHorizontal={true}
              heading="Popular"
              movies={movies.popularMovies}
            />
            <MovieList
              isHorizontal={true}
              heading="Top Rated"
              movies={movies.topRatedMovies}
            />
            <MovieList
              isHorizontal={true}
              heading="Upcoming"
              movies={movies.upcomingMovies}
            />
          </>
        )}
        {filteredMovies.movies.length > 0 && (
          <MovieList
            heading={filteredMovies.categoryName}
            movies={filteredMovies.movies}
          />
        )}
      </BodyWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  image: {
    width: "100%",
    height: 300,
  },
  imageText: {
    color: COLORS.textLight,
    fontSize: 35,
    margin: 15,
    textAlign: "center",
    paddingTop: 25,
  },
});

export default HomeScreen;
