import { Text, View, TextInput, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";

// CHECK DOCS...

const Input = ({ label }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} autoCapitalize="none" />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  input: {
    borderRadius: 5,
    // backgroundColor: COLORS.primaryDark,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.textLight,
    color: COLORS.textLight,
    fontSize: 16,
    padding: 7,
  },
});
