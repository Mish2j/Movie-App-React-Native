import { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import { COLORS } from "../../constants/styles";

import IconButton from "../UI/IconButton";

const MovieCategoryList = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const movieCategories = [
    "All",
    "Action",
    "Comedies",
    "Documentaries",
    "Crime",
  ];

  const toggleListHandler = () => {
    setIsListOpen((curState) => !curState);
  };

  const selectedCategoryHandler = () => {
    // filter movies
  };

  const categoryList = movieCategories.map((cat) => {
    return (
      <Pressable
        onPress={selectedCategoryHandler}
        key={cat}
        style={({ pressed }) => [
          styles.textContainer,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.text}>{cat}</Text>
      </Pressable>
    );
  });

  return (
    <ScrollView style={styles.categoryListContainer}>
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
    </ScrollView>
  );
};

export default MovieCategoryList;

const styles = StyleSheet.create({
  categoryListContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.primaryLight,
    marginBottom: 10,
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
