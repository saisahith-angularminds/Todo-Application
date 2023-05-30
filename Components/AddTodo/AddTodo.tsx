import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { AddTodoStyles as styles } from "./AddTodoStyles";
import { useDispatch, useSelector } from "react-redux";
import { editId, setPopUp, todo, updateTodoData } from "../../Redux/reducer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox, Input } from "@rneui/themed";
// import RNDateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  id?: string;
};

export const AddTodo = (props: Props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const { todo:{listOfTodos, isPopup, updateId},user:{user} } = useSelector(
    (state: any) => state
  );
  console.info(user.id)
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startOpen, setStartOpen] = useState<boolean>(false);
  const [startTimeOpen, setStartTimeOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endTimeOpen, setEndTimeOpen] = useState<boolean>(false);
  const [endOpen, setEndOpen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<boolean>(false);
  useEffect(() => {
    setValuesUpdate();
    if (!updateId) {
      const newDate = new Date();
      const added = 23 - newDate.getHours();
      newDate.setHours(newDate.getHours() + added, 0, 0);
      setEndDate(newDate);
    }
  }, [updateId]);

  const setValuesUpdate = () => {
    if (updateId) {
      const editTodo = listOfTodos.filter((item: any) => item.id === updateId);
      setTitle(editTodo[0].title);
      setDescription(editTodo[0].description);
      setCountdown(editTodo[0].countdown);
      if (editTodo[0].countdown) {
        const setdae = "";
        setStartDate(new Date(editTodo[0].startDate));
        setEndDate(new Date(editTodo[0].endDate));
      } else {
        setStartDate(new Date());
        const newDate = new Date();
        const added = 23 - newDate.getHours();

        newDate.setHours(newDate.getHours() + added, 59, 0);
        setEndDate(newDate);
      }
    }
  };
  const setLocalStore = async (key: string, values: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(values));
    } catch (error) {
      console.error(error);
    }
  };

  const onSaveTodo = () => {
    try {
      if (!title && !description) {
        throw new Error("Fill the title and description");
      } else {
        const options:any = {
          month: "long",
          day: "numeric",
          year: '"numeric" | "2-digit" | string',
        };
        const currentDate = new Date("").toLocaleDateString("en-US", options);
        const setOptions = {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        const newTodo = {
          id: uuid.v4(),
          title,
          userId:user.id,
          description,
          completed: false,
          date: currentDate,
          countdown,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
        };
        updateId
          ? dispatch(
              updateTodoData({
                updateData: {
                  title,
                  description,
                  countdown,
                  startDate: startDate.toString(),
                  endDate: endDate.toString(),
                },
              })
            )
          : dispatch(todo({ listOfTodos: [...listOfTodos, { ...newTodo }] }));

        setLocalStore("todos", [...listOfTodos, { ...newTodo }]);
        closePop();
      }
    } catch (error) {
      console.error(error);
    }
    setTitle("");
    setDescription("");
  };
  const closePop = () => {
    sendUpdateId("");
    dispatch(setPopUp({ isPopup: false }));
  };
  const sendUpdateId = (todoId: string) => dispatch(editId({ id: todoId }));

  return (
    <View style={styles.containerAddTodo}>
      <View style={styles.titleContainer}>
        <Text style={styles.addTodoText}>AddTodo</Text>
      </View>
      <TextInput
        style={{ ...styles.inputField, ...styles.titleInput }}
        value={title}
        onChangeText={(text: string) => setTitle(text)}
        placeholder="Enter Title"
        autoCorrect={true}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Enter Description"
        value={description}
        onChangeText={(text: string) => setDescription(text)}
        multiline={true}
        // style={styles.buttonStyles}
      />
      <CheckBox
        checked={countdown}
        onPress={() => setCountdown((value: boolean) => !value)}
        iconType="material-community"
        checkedIcon="checkbox-outline"
        uncheckedIcon={"checkbox-blank-outline"}
        title={"Advanced"}
      />

      {countdown && (
        <View>
          <Text style={styles.addTodoText}>Start Todo</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setStartOpen(true)}>
              <Input
                containerStyle={styles.date}
                inputStyle={styles.inputDate}
                disabled
                value={startDate.toLocaleDateString()}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              mode="date"
              isVisible={startOpen}
              date={startDate}
              minimumDate={new Date()}
              onConfirm={(date: Date) => {
                setStartOpen(false);
                setStartDate(date);
              }}
              onCancel={() => setStartOpen(false)}
            />
            <TouchableOpacity onPress={() => setStartTimeOpen(true)}>
              <Input
                disabled
                value={startDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                containerStyle={styles.date}
                inputStyle={styles.inputDate}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              mode="time"
              is24Hour={false}
              isVisible={startTimeOpen}
              date={startDate}
              minimumDate={new Date()}
              onConfirm={(date: Date) => {
                setStartTimeOpen(false);
                setStartDate(date);
              }}
              onCancel={() => setStartTimeOpen(false)}
            />
          </View>
          <Text style={styles.addTodoText}>End Todo</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setEndOpen(true)}>
              <Input
                disabled
                value={endDate.toLocaleDateString()}
                containerStyle={styles.date}
                inputStyle={styles.inputDate}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              mode="date"
              isVisible={endOpen}
              date={endDate}
              minimumDate={new Date()}
              onConfirm={(date: Date) => {
                setEndOpen(false);
                setEndDate(date);
              }}
              onCancel={() => setEndOpen(false)}
            />
            <TouchableOpacity onPress={() => setEndTimeOpen(true)}>
              <Input
                disabled
                value={endDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                containerStyle={styles.date}
                inputStyle={styles.inputDate}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              mode="time"
              is24Hour={false}
              isVisible={endTimeOpen}
              date={endDate}
              onConfirm={(date: Date) => {
                setEndTimeOpen(false);
                setEndDate(date);
              }}
              onCancel={() => setEndTimeOpen(false)}
            />
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSaveTodo}>
          <Text style={styles.buttonTextStyle}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.cancelButton }}
          onPress={closePop}>
          <Text style={styles.buttonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
