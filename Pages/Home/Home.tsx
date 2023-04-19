import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { styles } from "./HomeStyles";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
type Props = {
  navigation: StackNavigationProp<{}>;
};

export const Home = (props: Props) => {
  const navigation = useNavigation();
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
