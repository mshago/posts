import React from "react";
import { ActivityIndicator, StatusBar, SafeAreaView } from "react-native";
import { styles } from "./Container.styles";

export const Container = ({children, style:customStyles, isLoading=false}) => {
  
  if(isLoading){
    return <ActivityIndicator/>
  }
  
  return (
    <SafeAreaView style={[styles.container,customStyles]}>
      <StatusBar barStyle='dark-content' hidden={false} />
      {children}
    </SafeAreaView>
  );
};
