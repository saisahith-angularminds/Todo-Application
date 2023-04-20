import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TodoContainer } from "../TodoContainer";
import { useSelector } from "react-redux";

type DisplayPageProps = {};

export const DisplayPage = (props: DisplayPageProps) => {
  const { listOfTodos, isPopup } = useSelector((state: any) => state.todo);
  return (
    <View>
      {listOfTodos.map((each: any) => (
        <TodoContainer todo={each} key={each.id} />
      ))}
    </View>
  );
};
