import { useState } from "react";
import { StyleSheet, Alert, View } from "react-native";

import { ERROR } from "../../constants/config";
import { getSearchedMovie } from "../../util/http";

import Loader from "../UI/Loader";
import MovieList from "../movie/MovieList";
import EmptyList from "./EmptyList";
import SearchBar from "../UI/SearchBar";

const SearchMovieBody = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [enteredKeyword, setEnteredKeyword] = useState("");

  const isEnteredKeywordEmpty = enteredKeyword.trim().length === 0;
  const isMoviesEmpty = foundMovies.length === 0;
  let content;
  let debounce = null;

  const movieSearchHandler = (userSearch) => {
    clearTimeout(debounce);

    if (userSearch.trim().length === 0) {
      setEnteredKeyword("");
      setFoundMovies([]);
      return;
    }

    debounce = setTimeout(async () => {
      try {
        setIsLoading(true);

        const moviesData = await getSearchedMovie(userSearch);
        setEnteredKeyword(userSearch);
        setFoundMovies(moviesData);
      } catch (error) {
        Alert.alert(ERROR.REQUEST_FAILED, error.message);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  content = (
    <EmptyList
      isEnteredKeywordEmpty={isEnteredKeywordEmpty}
      isMoviesEmpty={isMoviesEmpty}
    />
  );

  if (isLoading) {
    content = <Loader />;
  }

  if (!isMoviesEmpty) {
    content = <MovieList isLoading={isLoading} movies={foundMovies} />;
  }

  return (
    <View style={styles.contentContainer}>
      <SearchBar onSearch={movieSearchHandler} />
      {content}
    </View>
  );
};

export default SearchMovieBody;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
