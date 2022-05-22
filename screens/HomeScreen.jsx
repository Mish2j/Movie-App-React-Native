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

  useEffect(() => {
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
  }, []);

  return (
    <ScrollView style={styles.container}>
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
        <MovieCategoryList />
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
