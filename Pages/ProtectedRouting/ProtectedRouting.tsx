import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
// import * as Linking from 'expo-linking';
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProtectedRoutingStyles as styles } from "./ProtectedRoutingStyles";
import { ReactNode, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/User/reducer";
import { Image } from "expo-image";
import { Text } from "@rneui/themed";
import { makeRedirectUri } from "expo-auth-session";
import { Input } from "@rneui/base";

WebBrowser.maybeCompleteAuthSession();
type Props = {};
export const ProtectedRouting = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [register, setRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [token, setToken] = useState<string | undefined>("");

  const {
    user: { user },
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "941670755335-a84s0fcc2ao192m0enktgkqq8ho2biql.apps.googleusercontent.com",
    androidClientId:
      "941670755335-9jcin2q1bokkblm4lqrfequ8foepd1nb.apps.googleusercontent.com",
  });
  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    if (!user) {
      if (response?.type === "success") {
        console.log(response);
        setToken(response?.authentication?.accessToken);
        await AsyncStorage.setItem(
          "token",
          response?.authentication?.accessToken ?? ""
        );
        getUserInfo(response?.authentication?.accessToken);
      }
    } else {
      console.log("loaded locally");
    }
  }

  const getUserInfo = async (token: any) => {
    console.log(token, "===>token");
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      dispatch(updateUser({ user: user }));
    } catch (error) {
      // Add your own error handler here
    }
  };
  const OnRegister = async () => {
    const ListOfUsers: any = await AsyncStorage.getItem("listOfUsers");
    const users: any = JSON.parse(ListOfUsers || "[]");
    if (name && email && password) {
      await AsyncStorage.setItem(
        "listOfUsers",
        JSON.stringify([...users, { name, email, password, id: uuid.v4() }])
      );
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({ name, email, password, id: uuid.v4() })
      );
      dispatch(updateUser({ user: { name, email, password, id: uuid.v4() } }));
    }else{
      setError("Fill All the Details");
    }
  };
  const SignIn = async () => {
    const ListOfUsers: any = await AsyncStorage.getItem("listOfUsers");
    const users: any = JSON.parse(ListOfUsers || "[]").filter(
      (each: any) => each.email === email
    );
    console.log(users);
    if (users[0].password === password) {
      await AsyncStorage.setItem("@user", JSON.stringify(users[0]));
      dispatch(updateUser({ user: users[0] }));
      setError("");
    } else {
      setError("Incorrect email or password");
    }
  };
  console.log(error);
  return (
    <View style={styles.container}>
      <Text style={styles.SignUpSignInLine}>
        To {register ? "Sign in" : "Sign up"}{" "}
        <Text
          style={styles.SignUpSignInText}
          onPress={() => {
            setRegister((p) => !p);
            setName("");
            setPassword("");
            setEmail("");
            setError("");
          }}>
          click here
        </Text>
      </Text>
      <Input
        containerStyle={{
          ...styles.titleContainer,
          display: register ? "flex" : "none",
        }}
        placeholder="User Name"
        onChangeText={(text: string) => setName(text)}
      />
      <Input
        containerStyle={styles.titleContainer}
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
      />
      <Input
        containerStyle={styles.titleContainer}
        secureTextEntry={true}
        onChangeText={(text: string) => {
          setPassword(text), setError("");
        }}
        placeholder="Password"
      />
      <Text>{error ?? ""}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={register ? OnRegister : SignIn}>
        <Text style={styles.buttonTextStyle}>
          {register ? "Sign up" : "Sign in"}
        </Text>
      </TouchableOpacity>
      <Text>Or</Text>
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}>
        <View style={styles.signInContainer}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            }}
            // style={{width: 40, height: 40}}
            key={"todo"}
            contentFit="cover"
            transition={1000}
            style={styles.tinyLogo}
          />
          <Text style={styles.signinText}>SignIn with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
