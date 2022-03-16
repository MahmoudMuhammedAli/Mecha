import React, { useEffect } from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import { RootTabScreenProps } from "../types";

const Loading = ({ navigation }: RootTabScreenProps<"Loading">) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ce1326",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 45,
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "space-mono",
          color: "#fcd116",
        }}
      >
        Finding Match...
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default Loading;
//todo use lottie for a better animation https://www.youtube.com/watch?v=8YTTmUH85Wo&ab_channel=FullStackNiraj
