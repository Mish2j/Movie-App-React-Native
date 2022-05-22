import { Pressable, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const IconButton = ({
  onPress,
  iconName,
  iconSize,
  iconColor,
  text,
  containerStyle,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonContainer,
        containerStyle && containerStyle,
        pressed && styles.pressed,
      ]}
    >
      {text && (
        <Text
          style={[
            { color: iconColor, marginRight: 10 },
            textStyle && textStyle,
          ]}
        >
          {text}
        </Text>
      )}
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
