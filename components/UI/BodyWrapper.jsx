import { View, StyleSheet } from "react-native";

const BodyWrapper = ({ children, color }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {children}
    </View>
  );
};

export default BodyWrapper;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flex: 1,
  },
});
