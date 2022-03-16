import React from "react";
import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

interface Props {
  player: number;
  name: string;
  points: number;
}
const Info: React.FC<Props> = (props) => {
  const { name, points, player } = props;
  return (
    <View
      style={[
        tw`absolute font-semibold ${player === 1
          ? "top-1 right-2 "
          : "bottom-1 left-2 "}`,
      ]}
    >
      <Text style={[ { color: "#fcd116", fontWeight: "bold" } ]}>{name}</Text>
      <Text style={[ { color: "#fcd116", fontWeight: "bold" } ]}>{points}</Text>
    </View>
  );
};
export default Info;
