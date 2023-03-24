import React from "react";
import { Text, View } from "react-native";
import { FormTextInput } from "../../components/form/formTextInput/FormTextInput";
import FormButton from "../../components/form/formButton/FormButton";
import { styles } from "./LoginScreen.styles";
import { Container } from "../../components/container/Container";

export const LoginScreenView = ({ error, loading, formik, navigation }) => {
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <FormTextInput
          title={"email"}
          value={formik.values.email}
          onBlur={formik.handleBlur("email")}
          onChangeText={formik.handleChange("email")}
          placeholder={"Enter your email"}
          textContentType={"emailAddress"}
          autoCapitalize={"none"}
          errors={formik.errors.email}
          touched={formik.touched.email}
        />
        <FormTextInput
          value={formik.values.password}
          onBlur={formik.handleBlur("password")}
          onChangeText={formik.handleChange("password")}
          title={"password"}
          placeholder={"Enter your password"}
          errors={formik.errors.password}
          touched={formik.touched.password}
          isSensitive={true}
        />
        <FormButton
          loading={loading}
          onPress={loading ? () => {} : formik.handleSubmit}
          title={"Sign in"}
          disabled={loading}
        />
        <Text
          style={styles.signup}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Don't have an account?
        </Text>
      </View>
    </Container>
  );
};
