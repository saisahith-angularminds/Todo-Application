import { Text, View } from "react-native";
import React, { useState } from "react";
import { AllTodosStyles as Styles } from "./AllTodosStyles";
import Modal from "react-native-modal";
import { AddTodo } from "../../Components/AddTodo";
import { Button } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { setPopUp } from "../../Redux/reducer";
import { DisplayPage } from "../../Components/DisplayPage";
type AllTodosProps = {};

export const AllTodos = (props: AllTodosProps) => {
  const dispatch = useDispatch();
  const { todo:{listOfTodos, isPopup},user:{user} } = useSelector((state: any) => state);

  const closePop = () => dispatch(setPopUp({ isPopup: true }));
  const openPop = () => dispatch(setPopUp({ isPopup: true }));

  return (
    <>
      {listOfTodos.filter((todo:any)=>todo.userId===user.id).length ? (
        <DisplayPage />
      ) : (
        <View style={Styles.viewDesign}>
          <Button
            buttonStyle={Styles.addTodoButton}
            titleStyle={Styles.buttonTitle}
            title="Add Todo"
            onPress={openPop}
          />
          <Text>No Tasks Added!</Text>
          <Modal
            isVisible={isPopup}
            onBackButtonPress={closePop}
            swipeDirection="left">
            <AddTodo />
          </Modal>
        </View>
      )}
    </>
  );
};
