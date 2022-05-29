import { ActivityIndicator, View, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";

const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.textDark} />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  loaderContainer: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: COLORS.primaryLight,
  },
});
