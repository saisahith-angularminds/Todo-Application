import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TodoContainer } from "../../Components/TodoContainer";
import { useSelector } from "react-redux";

type ExpiredTodosProps = {};

export const ExpiredTodos = (props: ExpiredTodosProps) => {
  const { todo:{listOfTodos, isPopup},user:{user} } = useSelector((state: any) => state);
  const ExpiredTodosList = listOfTodos.filter((todo:any)=>todo.userId===user.id)
    .filter((each: any) => each.countdown === true && each.completed === false)
    .filter((each: any) => {
      const today = new Date();
      const sec = today.getTime();
      const endDate = new Date(each.endDate);
      const endSec = endDate.getTime();
      if (sec >= endSec) {
        return each;
      }
    });
  return (
    <View>
      {ExpiredTodosList.map((each: any) => (
        <TodoContainer todo={each} key={each.id} />
      ))}
    </View>
  );
};
