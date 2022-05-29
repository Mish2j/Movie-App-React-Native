import { View, StyleSheet, Text } from "react-native";

import { COLORS } from "../../constants/styles";

const EmptyList = ({ isMoviesEmpty, isEnteredKeywordEmpty }) => {
  return (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListText}>
        {isEnteredKeywordEmpty && "Type something to find movies."}
        {!isEnteredKeywordEmpty &&
          isMoviesEmpty &&
          `Couldn't find movies, sorry...`}
      </Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListText: {
    width: "75%",
    color: COLORS.textLight,
    fontSize: 25,
    textAlign: "center",
  },
});
