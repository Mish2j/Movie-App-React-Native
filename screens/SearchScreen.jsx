import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";

import { COLORS } from "../constants/styles";
import { getSearchedMovie } from "../util/http";

import { Ionicons } from "@expo/vector-icons";
import MovieList from "../components/movie/MovieList";
import BodyWrapper from "../components/UI/BodyWrapper";

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [enteredKeyword, setEnteredKeyword] = useState("");

  const isEnteredKeywordEmpty = enteredKeyword.trim().length === 0;
  const isMoviesEmpty = foundMovies.length === 0;

  let content;

  const userInputHandler = (userInput) => {
    setEnteredKeyword(userInput);
  };

  useEffect(() => {
    // ADD DEBOUNCING
    // ADD error handling

    if (isEnteredKeywordEmpty) {
      setFoundMovies([]);
      return;
    }

    const getData = async () => {
      try {
        setIsLoading(true);

        const moviesData = await getSearchedMovie(enteredKeyword);

        setFoundMovies(moviesData);
      } catch (error) {
        Alert.alert("Request Error.", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [enteredKeyword]);

  content = (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>
        {isLoading && "Loading"}
        {!isLoading &&
          isEnteredKeywordEmpty &&
          "Type something to find movies."}
        {!isLoading &&
          !isEnteredKeywordEmpty &&
          isMoviesEmpty &&
          `Couldn't find movies, sorry...`}
      </Text>
    </View>
  );

  if (!isMoviesEmpty) {
    content = <MovieList isLoading={isLoading} movies={foundMovies} />;
  }

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <View style={styles.inputContainer}>
        <Ionicons
          style={styles.inputIcon}
          name="search"
          size={16}
          color={COLORS.textDark}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          autoCorrect={false}
          onChangeText={userInputHandler}
          placeholderTextColor={COLORS.textDark}
        />
      </View>
      <View style={styles.contentContainer}>{content}</View>
    </BodyWrapper>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    backgroundColor: COLORS.primaryLight,
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textLight,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListText: {
    width: "75%",
    color: COLORS.textLight,
    fontSize: 25,
    textAlign: "center",
  },
});
