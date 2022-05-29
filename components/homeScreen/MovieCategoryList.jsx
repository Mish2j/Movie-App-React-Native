import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import { COLORS } from "../../constants/styles";
import { MOVIE_GENRES } from "../../constants/config";

import IconButton from "../UI/IconButton";

const MovieCategoryList = ({ filterHandler }) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleListHandler = () => {
    setIsListOpen((curState) => !curState);
  };

  const selectedCategoryHandler = (categoryId, categoryName) => {
    setIsListOpen(false);
    filterHandler(categoryId, categoryName);
  };

  const categoryList = MOVIE_GENRES.map((cat) => {
    return (
      <Pressable
        onPress={selectedCategoryHandler.bind(null, cat.id, cat.name)}
        key={cat.id}
        style={({ pressed }) => [
          styles.textContainer,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.text}>{cat.name}</Text>
      </Pressable>
    );
  });

  return (
    <View style={styles.categoryListContainer}>
      <IconButton
        iconName={`chevron-${isListOpen ? "up" : "down"}-outline`}
        iconColor={COLORS.textLight}
        iconSize={24}
        text="Categories"
        textStyle={{ fontSize: 16 }}
        containerStyle={styles.categoryHeading}
        onPress={toggleListHandler}
      />
      {isListOpen && <View style={styles.list}>{categoryList}</View>}
    </View>
  );
};

export default MovieCategoryList;

const styles = StyleSheet.create({
  categoryListContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.primaryLight,
    marginVertical: 10,
  },
  categoryHeading: {
    alignSelf: "center",
  },
  list: {
    marginTop: 8,
  },
  textContainer: {
    padding: 10,
    marginVertical: 3,
    borderRadius: 5,
  },
  text: {
    textAlign: "center",
    color: COLORS.textLight,
  },
  pressed: {
    opacity: 0.7,
  },
});
