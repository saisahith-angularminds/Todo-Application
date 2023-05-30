import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TodoContainer } from "../../Components/TodoContainer";
import { useSelector } from "react-redux";

type CompletedTodosProps = {};

export const CompletedTodos = (props: CompletedTodosProps) => {
  const { todo:{listOfTodos, isPopup},user:{user} } = useSelector((state: any) => state);

  return (
    <View>
      {listOfTodos.filter((todo:any)=>todo.userId===user.id)
        .filter((each: any) => each.completed === true)
        .map((each: any) => (
          <TodoContainer todo={each} key={each.id} />
        ))}
    </View>
  );
};
