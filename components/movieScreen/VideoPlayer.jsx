import { useEffect, useState, useRef, useCallback } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import { COLORS } from "../../constants/styles";
import { getMovieDetails } from "../../util/http";
import { IMAGE_URL } from "../../constants/config";

import YoutubePlayer from "react-native-youtube-iframe";
import Loader from "../UI/Loader";

const VideoPlayer = ({ isPlaying, onPlay }) => {
  const [videoId, setVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const route = useRoute();

  const movieData = route.params?.movieData;
  const movieId = movieData.id;

  useEffect(() => {
    const getMovieVideo = async () => {
      try {
        setIsLoading(true);
        const movieDetails = await getMovieDetails(movieId);

        setVideoId(movieDetails.videos?.results[0]?.key);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieVideo();
  }, [movieId]);

  // const onStateChange = useCallback((state) => {
  //   if (state === "playing" || "paused") {
  //     onPlay();
  //   }
  // }, []);

  return (
    <View style={styles.videoContainer}>
      {isLoading && <Loader />}
      {!isLoading && (
        <YoutubePlayer
          onChangeState={onStateChange}
          ref={videoRef}
          height={"100%"}
          width={"100%"}
          play={isPlaying}
          resizeMode="contain"
          // source={{ uri: `${MOVIE_VIDEO}${videoId}` }}
          // endWithThumbnail
          videoId={videoId}
          thumbnail={{ uri: `${IMAGE_URL}${movieData.backdrop_path}` }}
        />
      )}
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  videoContainer: {
    width: "100%",
    height: 218,
    backgroundColor: COLORS.primaryLight,
    marginBottom: 15,
  },
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
