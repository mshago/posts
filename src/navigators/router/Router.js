import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/auth";
import { AuthNavigator } from "../auth/AuthNavigator";
import { PostsNavigator } from "../posts/PostsNavigator";
import { AUTH_ACTIONS } from "../../contexts/actionTypes";
import { getData } from "../../utils/asyncStorage";
import { TOKEN_KEY } from "../../constants";
import { ImageBackground } from "react-native";
import { Container } from "../../components/container/Container";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fetchUserInfo } from "../../helpers/auth";

const splash = require("../../../assets/splash.png");

export const Router = () => {
  const { state, dispatch } = useAuthContext();

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getData(TOKEN_KEY);
      fetchUserInfo(userToken)
        .then((data) => {
          dispatch({ type: AUTH_ACTIONS.RESTORE_TOKEN, token: userToken });
        })
        .catch((error) => {
          dispatch({ type: AUTH_ACTIONS.RESTORE_TOKEN, token: "" });
        });
    };
    fetchToken();
  }, []);

  if (state.isLoading) {
    return (
      <Container>
        <ImageBackground
          source={splash}
          resizeMode="cover"
          style={{
            flex: 1,
          }}
        />
      </Container>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {state.userToken ? <PostsNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
