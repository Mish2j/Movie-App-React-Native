import { View, StyleSheet, TextInput } from "react-native";

import { COLORS } from "../../constants/styles";

import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons
        style={styles.inputIcon}
        name="search"
        size={16}
        color={COLORS.textDark}
      />
      <TextInput
        style={styles.input}
        placeholder="Search"
        autoCorrect={false}
        onChangeText={onSearch}
        placeholderTextColor={COLORS.textDark}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    backgroundColor: COLORS.primaryLight,
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textLight,
  },
});
