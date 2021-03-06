import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IMAGE_URL } from "../../constants/config";
import { COLORS } from "../../constants/styles";
import Title from "../UI/Title";

const MovieList = ({ heading, isHorizontal = false, movies, isLoading }) => {
  const { navigate } = useNavigation();

  const selectedMovieHandler = (movie) => {
    navigate("Movie", { movieData: movie });
  };

  const renderMovieList = (itemData) => {
    return (
      <Pressable
        onPress={selectedMovieHandler.bind(null, itemData.item)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={isHorizontal ? { marginRight: 10 } : { margin: 2.5 }}>
          <View style={styles.imageContainer}>
            {isLoading && (
              <ActivityIndicator size="large" color={COLORS.textDark} />
            )}
            {!isLoading &&
              (itemData.item.poster_path ? (
                <Image
                  style={styles.image}
                  source={{ uri: `${IMAGE_URL}${itemData.item.poster_path}` }}
                />
              ) : (
                <Text style={styles.noImageText}>Poster Not Available</Text>
              ))}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {heading && <Title text={heading} />}

      <FlatList
        numColumns={!isHorizontal && 3}
        data={movies}
        renderItem={renderMovieList}
        keyExtractor={(item) => item.id}
        horizontal={isHorizontal}
      />
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 25,
  },
  imageContainer: {
    borderRadius: 7,
    width: 120,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
  },
  image: {
    borderRadius: 7,
    width: 120,
    height: 180,
  },
  noImageText: {
    fontSize: 18,
    color: COLORS.textDark,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
