import * as firebaseApp from 'firebase/app'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDyi97YMBClZDnl5IwV-73rehyfV3mUYk",
  authDomain: "instagramclone-9f4c2.firebaseapp.com",
  projectId: "instagramclone-9f4c2",
  storageBucket: "instagramclone-9f4c2.appspot.com",
  messagingSenderId: "278613975270",
  appId: "1:278613975270:web:2e93625d2a7284d50e1b27",
  measurementId: "G-E81QMK49B8"
};

if (firebaseApp.getApps().length === 0) {
  console.log(firebaseApp.initializeApp(firebaseConfig))
}

import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, NavigationProp, ParamListBase } from '@react-navigation/native'
import { default as LandingScreen } from './components/auth/Landing';
import { Register as RegisterScreen } from './components/auth/Register';
import { Login as LoginScreen } from './components/auth/Login';

type MainStackParamList = {
  Landing: { navigation: NavigationProp<ParamListBase> },
  Register: {},
  Login: {},
}

const Stack = createStackNavigator<MainStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing'>
        <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
