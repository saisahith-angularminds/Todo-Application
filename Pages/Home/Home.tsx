import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { styles } from "./HomeStyles";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import * as Google from 'expo-google-app-auth';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StackNavigationProp } from "@react-navigation/stack";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import { Button } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
WebBrowser.maybeCompleteAuthSession();
type Props = {
  navigation: StackNavigationProp<{}>;
};
export const Home = (props: Props) => {
  const navigation:any = useNavigation();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tinyLogo}
        onPress={() => navigation.navigate("AllTodos")}>
        <Image
          style={styles.tinyLogo}
          source="https://zenkit.com/wp-content/themes/zenkit-com/img/icons/todo.svg"
          key={"todo"}
          contentFit="cover"
          transition={1000}
        />
       
      </TouchableOpacity>
    </View>
  );
};
