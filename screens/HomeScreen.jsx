import { ScrollView, StyleSheet, View, SectionList } from "react-native";

import { COLORS } from "../constants/styles";

import Hero from "../components/homeScreen/Hero";
import Body from "../components/homeScreen/Body";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Hero />
      <Body />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
});

export default HomeScreen;
