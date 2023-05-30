import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TodoContainer } from "../TodoContainer";
import { useSelector } from "react-redux";

type DisplayPageProps = {};

export const DisplayPage = (props: DisplayPageProps) => {
  const { todo:{listOfTodos, isPopup},user:{user} } = useSelector((state: any) => state);
  return (
    <View>
      {listOfTodos.filter((todo:any)=>todo.userId===user.id).map((each: any) => (
        <TodoContainer todo={each} key={each.id} />
      ))}
    </View>
  );
};
