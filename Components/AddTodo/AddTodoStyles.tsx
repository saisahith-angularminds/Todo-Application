import { StyleSheet } from "react-native";

export const AddTodoStyles = StyleSheet.create({
  containerAddTodo: {
    backgroundColor: "#E6E6FA",
    borderRadius: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  button: {
    width: 150,
    height: 30,
    backgroundColor: "#87CEEB",
    borderRadius: 5,
  },

  cancelButton: {
    backgroundColor: "#C8A2C8",
  },
  buttonTextStyle: {
    color: "#403d36",
    fontSize: 18,
    textAlign: "center",
  },
  addTodoText: {
    color: "#403d36",
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
  },
  titleContainer: {
    backgroundColor: "#87CEEB",
    borderRadius: 5,
  },
  inputField: {
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "#403d36",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  titleInput: {
    fontWeight: "600",
  },
  date: {
    height: 44,
    width: 150,
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
  inputDate: {
    fontWeight: "300",
  },
});
