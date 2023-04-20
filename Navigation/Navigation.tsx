import { Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "../Pages/Home";
import { AllTodos } from "../Pages/AllTodos";
import { AddTodo } from "../Components/AddTodo";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { setPopUp, todo } from "../Redux/reducer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CompletedTodos } from "../Pages/CompletedTodos";
import { InCompletedTodos } from "../Pages/InCompletedTodos";
import { ExpiredTodos } from "../Pages/ExpiredTodos";
import { OnGoingTodos } from "../Pages/OnGoingTodos";

type Props = {};

export const Navigation = (props: Props) => {
  const Tab = createBottomTabNavigator();
  const { listOfTodos, isPopup } = useSelector((state: any) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    getLocalStore("todos");
  }, []);
  useEffect(() => {
    setLocalStore("todos", [...listOfTodos]);
  }, [listOfTodos]);
  const getLocalStore = async (key: string) => {
    try {
      const storeValues = await AsyncStorage.getItem(key);
      const conditionalValues = storeValues ? JSON.parse(storeValues) : [];
      dispatch(todo({ listOfTodos: [...conditionalValues] }));
    } catch (error) {
      console.error(error);
    }
  };
  const setLocalStore = async (key: string, values: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(values));
    } catch (error) {
      console.error(error);
    }
  };
  const closePop = () => dispatch(setPopUp({ isPopup: false }));
  const openPop = () => dispatch(setPopUp({ isPopup: true }));
  const optionForHeader = {
    headerLeft: () => (
      <TouchableOpacity onPress={openPop}>
        <Text style={{ color: "#87CEEB", paddingLeft: 9 }}>Add Todo</Text>
      </TouchableOpacity>
    ),
  };
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarButton: () => null,
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AllTodos"
          component={AllTodos}
          options={{
            headerShown: true,
            title: "All Todo",
            headerTitleAlign: "center",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
            ...optionForHeader,
          }}
        />
        <Tab.Screen
          name="Completed"
          component={CompletedTodos}
          options={{
            headerShown: true,

            headerTitleAlign: "center",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="check" color={color} size={size} />
            ),
            ...optionForHeader,
          }}
        />
        <Tab.Screen
          name="Ongoing"
          component={OnGoingTodos}
          options={{
            headerShown: true,

            headerTitleAlign: "center",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="alarm-multiple"
                color={color}
                size={size}
              />
            ),
            ...optionForHeader,
          }}
        />
        <Tab.Screen
          name="InCompleted"
          component={InCompletedTodos}
          options={{
            headerShown: true,

            headerTitleAlign: "center",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="close-outline"
                color={color}
                size={size}
              />
            ),
            ...optionForHeader,
          }}
        />
        <Tab.Screen
          name="Expired"
          component={ExpiredTodos}
          options={{
            headerShown: true,

            headerTitleAlign: "center",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="timer-off"
                color={color}
                size={size}
              />
            ),
            ...optionForHeader,
          }}
        />
      </Tab.Navigator>
      {/* <Home />r */}
      <Modal
        isVisible={isPopup}
        onBackButtonPress={closePop}
        swipeDirection="left">
        <AddTodo />
      </Modal>
    </NavigationContainer>
  );
};
