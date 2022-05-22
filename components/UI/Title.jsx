import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/styles";

const Title = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textLight,
  },
});
