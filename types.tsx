/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Welcome: NavigatorScreenParams<RootTabParamList> | undefined;
  HomeScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  Play: NavigatorScreenParams<RootTabParamList> | undefined;
  Game: NavigatorScreenParams<RootTabParamList> | undefined;
  Choose: NavigatorScreenParams<RootTabParamList> | undefined;
  Loading: NavigatorScreenParams<RootTabParamList> | undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginEmail: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  Welcome: undefined;
  LoginEmail: undefined;
  Game: undefined;
  Choose: undefined;
  Loading: undefined;
};

export type RootTabScreenProps<
  Screen extends keyof RootTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
