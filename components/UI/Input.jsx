import { Text, View, TextInput, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";

import IconButton from "./IconButton";

const Input = ({ label, onUpdateValue, onIconPress, icon, ...inputProps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...inputProps}
          onChangeText={onUpdateValue}
          style={styles.input}
        />
        {icon && (
          <IconButton
            containerStyle={styles.iconContainer}
            iconName={icon}
            iconSize={20}
            iconColor={COLORS.textLight}
            onPress={onIconPress}
          />
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.textLight,
  },
  label: {
    fontSize: 17,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  input: {
    color: COLORS.textLight,
    fontSize: 16,
    padding: 7,
    flex: 1,
  },
  iconContainer: {
    marginLeft: 5,
  },
});
