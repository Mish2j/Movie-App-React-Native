import { useState, useContext } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { MyMovieListContext } from "../store/myMovies-context";
import { getMovieDetails } from "../util/http";
import { COLORS } from "../constants/styles";
import { IMAGE_URL, MOVIE_VIDEO } from "../constants/config";

import IconButton from "../components/UI/IconButton";
import BodyWrapper from "../components/UI/BodyWrapper";
import Title from "../components/UI/Title";

const MovieScreen = ({ route, navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState(null);

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

  const playVideo = async () => {
    try {
      const movieDetails = await getMovieDetails(movieData.id);

      setVideoId(movieDetails.videos?.results[0]?.key);
    } catch (error) {
      console.log(error);
    }
  };

  const pauseVideo = () => {};

  const videoPlayerHandler = () => {
    if (!isPlaying) {
      playVideo();
      setIsPlaying(true);
      return;
    }

    // pauseVideo();
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={"100%"}
          width={"100%"}
          play={isPlaying}
          // style={styles.video}
          // source={{ uri: `${MOVIE_VIDEO}${videoId}` }}
          endWithThumbnail
          videoId={videoId}
          thumbnail={{ uri: `${IMAGE_URL}${movieData.backdrop_path}` }}
        />
      </View>
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
              onPress={videoPlayerHandler}
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
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDark,
    flex: 1,
  },
  videoContainer: {
    width: "100%",
    height: 218,
    backgroundColor: COLORS.primaryLight,
    // marginBottom: 15,
  },
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
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
