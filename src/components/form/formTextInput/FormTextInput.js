import React, {useState} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput as NativeTextInput,
  View,
} from "react-native";
import { Icon } from "@rneui/themed";
import FormErrorMessage from "../formErrorMessage/FormErrorMessage";

export const FormTextInput = ({ title, errors, touched, isSensitive, style:customStyles, ...otherProps }) => {
  const [iconColor, SetIconColor] = useState("#000");
  const [isVisible, setVisible] = useState(isSensitive);

  const showPassword = () => {
    SetIconColor(iconColor === "#000" ? "#c4c4c4" : "#000");
    setVisible(!isVisible);
  };

  return (
    <View style={[styles.formInputContainer,customStyles]}>
      {title && <Text style={styles.formTitle}>{title}</Text>}
      <NativeTextInput
        style={styles.formInput}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={isVisible}
        {...otherProps}
      />
      {isSensitive && (
        <Pressable
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => showPassword()}
        >
          <Icon
            style={styles.icon}
            name={isVisible ? "ios-eye-outline" : "ios-eye-off-outline"}
            type="ionicon"
            color="#000"
          />
        </Pressable>
      )}
      <FormErrorMessage error={errors} visible={touched} />
    </View>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  formInput: {
    height: 50,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  formInputContainer:{
    alignSelf: "stretch",
    marginBottom: 20
  }
});
