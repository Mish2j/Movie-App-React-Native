import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { COLORS } from "../../constants/styles";

import IconButton from "../UI/IconButton";
import TextButton from "../UI/TextButton";
import Title from "../UI/Title";

const UserData = ({ label, userData, onDataUpdate, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const editDataHandler = () => {
    setIsEditing((currentState) => !currentState);
  };

  const saveHandler = () => {
    onSave();
    setIsEditing(false);
  };

  return (
    <View style={styles.detailContainer}>
      <View>
        <Title text={label} />
        {isEditing ? (
          <>
            <TextInput
              onChangeText={onDataUpdate}
              style={styles.input}
              placeholder="Type..."
              placeholderTextColor={COLORS.textDark}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
            />
            <TextButton
              color="lightblue"
              text="Save changes"
              onPress={saveHandler}
              containerStyle={styles.saveBtn}
            />
          </>
        ) : (
          <Text style={styles.userData}>{userData}</Text>
        )}
      </View>
      <IconButton
        iconName="pencil-outline"
        iconColor={COLORS.primaryDark}
        iconSize={20}
        containerStyle={styles.editButton}
        onPress={editDataHandler}
      />
    </View>
  );
};

export default UserData;

const styles = StyleSheet.create({
  detailContainer: {
    marginVertical: 15,
    paddingHorizontal: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userData: {
    color: COLORS.textDark,
    fontSize: 18,
  },
  input: {
    width: 190,
    borderRadius: 5,
    backgroundColor: COLORS.primaryLight,
    color: COLORS.textLight,
    fontSize: 16,
    padding: 7,
  },
  editButton: {
    backgroundColor: COLORS.textLight,
    borderRadius: 5,
    padding: 7,
  },
  saveBtn: {
    marginTop: 5,
    alignSelf: "flex-start",
  },
});
