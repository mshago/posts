import React from "react";
import { Text, View } from "react-native";

//components
import { FormTextInput } from "../../components/form/formTextInput/FormTextInput";
import FormButton from "../../components/form/formButton/FormButton";
import { Container } from "../../components/container/Container";
import { styles } from "./RegisterScreen.styles";
import { ScrollView } from "react-native-gesture-handler";

export const RegisterScreenView = ({ formik, loading, navigation }) => {
  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          <FormTextInput
            title={"first name"}
            value={formik.values.name}
            onBlur={formik.handleBlur("name")}
            onChangeText={formik.handleChange("name")}
            placeholder={"Enter your first name"}
            errors={formik.errors.name}
            touched={formik.touched.name}
          />
          <FormTextInput
            title={"last name"}
            value={formik.values.last_name}
            onBlur={formik.handleBlur("last_name")}
            onChangeText={formik.handleChange("last_name")}
            placeholder={"Enter your last name"}
            errors={formik.errors.last_name}
            touched={formik.touched.last_name}
          />
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
            title={"username"}
            value={formik.values.username}
            onBlur={formik.handleBlur("username")}
            onChangeText={formik.handleChange("username")}
            placeholder={"Enter an username"}
            autoCapitalize={"none"}
            errors={formik.errors.username}
            touched={formik.touched.username}
          />
          <FormTextInput
            value={formik.values.password}
            onBlur={formik.handleBlur("password")}
            onChangeText={formik.handleChange("password")}
            title={"password"}
            placeholder={"Enter your password"}
            error={formik.errors.password}
            touched={formik.touched.password}
            isSensitive={true}
          />
          <FormButton
            loading={loading}
            onPress={loading ? () => {} : formik.handleSubmit}
            title={"Sign up"}
          />
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate("Login")}
          >
            Have an account?
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};
