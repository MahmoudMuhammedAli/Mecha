import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  Pressable,
  ImageBackground,
  Vibration,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome } from "@expo/vector-icons";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [ hasPermission, setHasPermission ] = useState(null);
  const [ scanned, setScanned ] = useState(false);
  const [ text, setText ] = useState("Not yet scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //TODO:VALIDATION GOES HERE
    Vibration.vibrate();
    navigation.navigate("Play");
    setScanned(true);
    setText(data);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Log in via QR Code</Text>
        <Pressable
          onPress={() => navigation.navigate("Modal")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name="info-circle"
            size={25}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 800, width: 800 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
      <Button title="Press me" onPress={() => navigation.navigate("Play")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "yellow",
    fontFamily: "space-mono",
    fontSize: 30,
    fontWeight: "bold",
  },
  center: {
    backgroundColor: "#fff",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
  },
  titleContainer: {
    display: "flex",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "65%",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
});
