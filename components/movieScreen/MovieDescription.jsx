import { StyleSheet, Text, ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { COLORS } from "../../constants/styles";

import BodyWrapper from "../UI/BodyWrapper";
import Title from "../UI/Title";

const MovieDescription = () => {
  const route = useRoute();
  const { title, overview } = route.params?.movieData;

  return (
    <BodyWrapper color={COLORS.primaryDark}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.innerWrapper}>
          <Title text={title ? title : "Title is not available."} />
          <Text style={styles.movieOverview}>
            {overview ? overview : "Summary is not available."}
          </Text>
        </View>
      </ScrollView>
    </BodyWrapper>
  );
};

export default MovieDescription;

const styles = StyleSheet.create({
  movieOverview: {
    color: COLORS.textLight,
    fontSize: 17,
  },
  innerWrapper: {
    paddingBottom: 100,
  },
});
