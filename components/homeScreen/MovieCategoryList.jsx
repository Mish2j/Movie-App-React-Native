import { useState } from "react";
import { View, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";
import { MOVIE_GENRES } from "../../constants/config";

import IconButton from "../UI/IconButton";
import TextButton from "../UI/TextButton";

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
      <TextButton
        key={cat.id}
        containerStyle={styles.textContainer}
        text={cat.name}
        color={COLORS.textLight}
        onPress={selectedCategoryHandler.bind(null, cat.id, cat.name)}
      />
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
    alignSelf: "center",
  },
});
