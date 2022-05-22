import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../constants/styles";
import { MyMovieListContext } from "../store/myMovies-context";

import MovieList from "../components/movie/MovieList";
import BodyWrapper from "../components/UI/BodyWrapper";
import IconButton from "../components/UI/IconButton";

const MyMoviesScreen = ({ navigation }) => {
  const myMoviesContext = useContext(MyMovieListContext);
  const { movies } = myMoviesContext;

  const navigateSearchScreen = () => {
    navigation.navigate("Search");
  };

  const navigateHomeScreen = () => {
    navigation.navigate("Home");
  };

  const emptyList = (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>You don't have saved movies yet.</Text>
      <View style={styles.btnsContainer}>
        <IconButton
          iconColor={COLORS.textDark}
          iconName="search-outline"
          iconSize={20}
          text="Find Movies"
          onPress={navigateSearchScreen}
          containerStyle={styles.button}
        />
        <IconButton
          iconColor={COLORS.textDark}
          text="Home"
          iconSize={20}
          iconName="arrow-forward-outline"
          onPress={navigateHomeScreen}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      {movies.length === 0 ? emptyList : <MovieList movies={movies} />}
    </BodyWrapper>
  );
};

export default MyMoviesScreen;

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    width: "75%",
    color: COLORS.textLight,
    fontSize: 25,
    textAlign: "center",
    marginBottom: 25,
  },
  btnsContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryLight,
  },
});
