import { StyleSheet } from "react-native";

export const ProtectedRoutingStyles = StyleSheet.create({
  tinyLogo: {
    width: 20,
    height: 20,
  },
  titleContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: 200,
    height: 40,
    marginTop: 10,
    textDecoration: "none",
  },
  buttonTextStyle: {
    color: "#403d36",
    fontSize: 18,
    textAlign: "center",
  },
  errorTextStyle: {
    color: "#E3242B",
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    width: 200,
    height: 35,
    backgroundColor: "#87CEEB",
    borderRadius: 5,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 500,
  },
  signInContainer: {
    width: 180,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    boxShadow: "rgba(0, 0, 0, 0.35) 0 5 15",
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    backgroundColor: "#ffffff",
    height: 50,
    borderRadius: 3,
  },
  signinText: {
    fontWeight: "700",
    fontSize: 15,
  },
  SignUpSignInLine: {
    fontSize: 15,
    fontWeight: "700",
  },
  SignUpSignInText: {
    fontSize: 15,
    color: "#87CEEB",
    textDecoration: "underline",
  },
});
