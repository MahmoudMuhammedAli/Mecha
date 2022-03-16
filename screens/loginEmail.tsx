import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Button,
  Alert,
  Image,
  Pressable,
  Vibration,
} from "react-native";

import { Text, View } from "../components/Themed";
import tw from "tailwind-react-native-classnames";
import { TextInput } from "react-native-gesture-handler";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import { setCardSet, setToken } from "../redux/User";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { pickName1 } from "../redux/Game";
export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const { token } = useSelector((state: RootState) => state.user);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const dispatch = useDispatch();
  //TODO: validate the email in the front end before sending it to the server. disabled during development.
  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://mighty-inlet-28867.herokuapp.com/login",
        {
          email,
          password,
        }
      );
      const token = res.data.token;
      console.log(token);
      dispatch(setToken(token));

      try {
        const userDetails = await axios.get(
          "https://mighty-inlet-28867.herokuapp.com/cards",
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        );
        dispatch(setCardSet(userDetails.data));
      } catch (err) {
        console.log(err);
      }
      try {
        const allUsers = await axios.get(
          "https://mighty-inlet-28867.herokuapp.com/users",
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        );
        const user = allUsers.data.filter(
          (user: any) => user.email === email
        )[0];
        dispatch(pickName1(user.name));
      } catch (err) {
        console.log(err);
      }

      //Navigation after getting the data
      if (token) {
        navigation.navigate("Play");
        Vibration.vibrate();
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Invalid Credentials");
      //! remove in production
      navigation.navigate("Play");
      Vibration.vibrate();
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[ tw`text-2xl text-white  mt-20`, styles.compete ]}>
        Login And Play Now!
      </Text>
      <View
        style={[
          tw` absolute bottom-0 w-full flex flex-col  items-center`,
          styles.bottomCont,
        ]}
      >
        <Image
          style={styles.image}
          source={require("../assets/images/pikachu.png")}
        />
        <View
          style={[
            tw` absolute bottom-0 bg-white  flex flex-col justify-center items-center w-full p-20`,
            styles.bottom,
          ]}
        >
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />

          <Pressable
            onPress={() => {
              handleLogin();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "#F4FD19",
              },
              styles.wrapperCustom,
            ]}
          >
            <Text style={styles.button}>Log in</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("HomeScreen");
              Vibration.vibrate();
            }}
            style={({ pressed }) => [ {}, styles.wrapperCustom, styles.logQr ]}
          >
            <Text style={[ styles.buttonQR, tw`text-gray-700 ` ]}>
              Sign in with QR Code
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: " rgb(255,62,62))",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  compete: {
    fontSize: 28,
    fontFamily: "space-mono",
    // color: "#fcd116",
    fontWeight: "bold",
  },

  image: {
    width: 130,
    height: 130,
  },
  wrapperCustom: {
    borderRadius: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#fff01b",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonQR: {
    padding: 3,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  bottomCont: {
    backgroundColor: " rgb(255,62,62))",
    height: "53%",
  },
  bottom: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  logQr: {
    position: "absolute",
    bottom: 5,
  },
});
