import { Pressable, Text, StyleSheet } from "react-native";

const TextButton = ({ onPress, text, color, containerStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        containerStyle && containerStyle,
        pressed && styles.btnPressed,
      ]}
    >
      <Text style={{ fontSize: 14, color: color }}>{text}</Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  btnPressed: {
    opacity: 0.7,
  },
});
