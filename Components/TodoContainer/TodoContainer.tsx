import { ListItem, Text } from "@rneui/base";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import {
  completedOrNot,
  deleteTodoById,
  editId,
  setPopUp,
} from "../../Redux/reducer";
import { TodoContainerStyles as styles } from "./TodoContainerStyles";
import Modal from "react-native-modal";
import { AddTodo } from "../AddTodo";
import Swipeout from "react-native-swipeout";

type TodoContainerProps = {
  todo: any;
};

export const TodoContainer = (props: TodoContainerProps) => {
  const { todo } = props;
  const dispatcher = useDispatch();
  const { listOfTodos, isPopup, updateId } = useSelector(
    (state: any) => state.todo
  );

  console.log("completed", todo.completed);
  const todoDelete = () => {
    dispatcher(deleteTodoById({ id: todo.id }));
  };
  const onCheck = () => {
    dispatcher(completedOrNot({ id: todo.id }));
  };
  const closePop = () => {
    sendUpdateId(todo.id);
    dispatcher(setPopUp({ isPopup: false }));
  };
  const openPop = () => {
    sendUpdateId(todo.id);
    dispatcher(setPopUp({ isPopup: true }));
  };
  console.log(updateId);
  const sendUpdateId = (todoId: string) => dispatcher(editId({ id: todoId }));
  let rightButton = [
    {
      text: "Delete",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.6)",
      onPress: todoDelete,
    },
  ];
  let leftButton = [
    {
      text: "edit",
      backgroundColor: "skyblue",
      underlayColor: "rgba(0, 0, 0, 1, 0.6)",
      onPress: openPop,

    },
  ];
  return (
    <>
      <Swipeout
        right={rightButton}
        left={leftButton}
        autoClose={true}
        backgroundColor="transparent">
        <ListItem key={todo.id}>
          <ListItem.CheckBox
            // Use ThemeProvider to change the defaults of the checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checked={todo.completed}
            onPress={onCheck}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{
                textDecorationLine: todo.completed ? "line-through" : "none",
              }}>
              {todo.title}
            </ListItem.Title>
            <ListItem.Subtitle>{todo.description}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={styles.dateText}>{todo.date}</Text>
          <Icon name="edit" size={20} color={"#9f84db"} onPress={openPop} />
          <Icon
            name="delete"
            size={20}
            color={"#f28097"}
            onPress={todoDelete}
          />
          <Modal
            isVisible={isPopup}
            onBackButtonPress={closePop}
            swipeDirection="left">
            <AddTodo />
          </Modal>
        </ListItem>
      </Swipeout>
    </>
  );
};
