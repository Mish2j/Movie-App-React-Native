import { useContext } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { MyMovieListContext } from "../../store/myMovies-context";
import { COLORS } from "../../constants/styles";

import IconButton from "../UI/IconButton";
import BodyWrapper from "../UI/BodyWrapper";
import Title from "../UI/Title";

const MovieDescription = ({ isPlaying, onPlay }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const movieData = route.params?.movieData;

  const myListContext = useContext(MyMovieListContext);

  const isMovieSaved = myListContext.movies.some(
    (movie) => movie.id === movieData.id
  );

  const saveMovieHandler = () => {
    if (isMovieSaved) {
      myListContext.removeMovie(movieData.id);
      return;
    }
    myListContext.addMovie(movieData);
    navigation.navigate("MyMovies");
  };

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <ScrollView>
        <Title text={movieData.title} />
        <View style={styles.btnsContainer}>
          <IconButton
            containerStyle={styles.iconBtn}
            iconName={isPlaying ? "pause-outline" : "play-outline"}
            iconSize={24}
            iconColor={COLORS.textDark}
            text={isPlaying ? "Pause" : "Play"}
            onPress={onPlay}
          />
          <IconButton
            containerStyle={styles.iconBtn}
            iconName="download-outline"
            iconSize={24}
            iconColor={COLORS.textDark}
            text="Download"
          />
          <IconButton
            onPress={saveMovieHandler}
            containerStyle={styles.iconBtn}
            iconName={isMovieSaved ? "checkmark-outline" : "add-outline"}
            iconSize={24}
            iconColor={COLORS.textDark}
            text={isMovieSaved ? "Saved" : "My List"}
          />
        </View>
        <Text style={styles.movieOverview}>{movieData.overview}</Text>
      </ScrollView>
    </BodyWrapper>
  );
};

export default MovieDescription;

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  iconBtn: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    padding: 10,
    margin: 3,
    borderRadius: 5,
    justifyContent: "center",
  },
  movieOverview: {
    color: COLORS.textLight,
    fontSize: 17,
  },
});
