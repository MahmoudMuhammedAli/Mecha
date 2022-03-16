/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Choose: {
            screens: {
              Choose: 'choose',
            },
          },
          Loading: {
            screens: {
              Loading: 'loading',
            },
          },
          LoginEmail: {
            screens: {
              LoginEmail: 'LoginEmail',
            },
          },
          Welcome: {
            screens: {
              Welcome: 'welcome',
            },
          },
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        
          TabThree: {
            screens: {
              GameScreen: 'game',
            },
          },
        
        },
      },
      Modal: 'Qr Code',
      NotFound: '*',
    },
  },
};

export default linking;
