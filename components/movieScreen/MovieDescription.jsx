import { StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import { COLORS } from "../../constants/styles";

import BodyWrapper from "../UI/BodyWrapper";
import Title from "../UI/Title";

const MovieDescription = () => {
  const route = useRoute();
  const movieData = route.params?.movieData;

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <Title text={movieData.title} />
      <Text style={styles.movieOverview}>{movieData.overview}</Text>
    </BodyWrapper>
  );
};

export default MovieDescription;

const styles = StyleSheet.create({
  movieOverview: {
    color: COLORS.textLight,
    fontSize: 17,
  },
});
