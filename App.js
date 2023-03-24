import "react-native-gesture-handler";
import React from "react";

import { AuthProvider, authReducer, authState } from "./src/contexts/auth";
import { Router } from "./src/navigators/router/Router";

export default function App() {
  return (
    <AuthProvider state={authState} reducer={authReducer}>
      <Router />
    </AuthProvider>
  );
}
