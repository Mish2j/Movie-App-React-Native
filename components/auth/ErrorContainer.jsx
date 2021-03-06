import { Text, View, StyleSheet } from "react-native";

import { COLORS } from "../../constants/styles";

import { Ionicons } from "@expo/vector-icons";

const ErrorContainer = ({ errors }) => {
  const renderErrors = Object.keys(errors).map((errorProp, i) =>
    errors[errorProp] ? (
      <Text key={i} style={styles.errorText}>
        {errors[errorProp]}
      </Text>
    ) : null
  );

  return (
    <View style={styles.container}>
      <View style={styles.errorIconContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={24}
          color={COLORS.dangerLight}
        />
        <Text style={styles.headingText}>Error</Text>
      </View>
      {renderErrors}
    </View>
  );
};

export default ErrorContainer;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: "85%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 7,
    backgroundColor: COLORS.primaryLight,
  },
  errorIconContainer: {
    padding: 5,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.dangerLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headingText: {
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.dangerLight,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.dangerLight,
    marginVertical: 5,
  },
});
