// Local imports
import { default as LandingScreen } from './src/components/auth/Landing';
import { Register as RegisterScreen } from './src/components/auth/Register';
import { Login as LoginScreen } from './src/components/auth/Login';
import MainScreen from './src/components/Main';

// React imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
	NavigationContainer,
	NavigationProp,
	ParamListBase,
} from '@react-navigation/native';

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Redux imports
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from './src/redux/reducers';
import thunk from 'redux-thunk';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCDyi97YMBClZDnl5IwV-73rehyfV3mUYk',
	authDomain: 'instagramclone-9f4c2.firebaseapp.com',
	projectId: 'instagramclone-9f4c2',
	storageBucket: 'instagramclone-9f4c2.appspot.com',
	messagingSenderId: '278613975270',
	appId: '1:278613975270:web:2e93625d2a7284d50e1b27',
	measurementId: 'G-E81QMK49B8',
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

type MainStackParamList = {
	Landing: { navigation: NavigationProp<ParamListBase> };
	Register: {};
	Login: {};
};

const Stack = createStackNavigator<MainStackParamList>();

interface IAppProp {}

interface IAppState {
	loggedIn?: boolean;
	loaded?: boolean;
}

export class App extends Component<IAppProp, IAppState> {
	constructor(props: IAppProp) {
		super(props);
		this.state = {
			loaded: false,
		};
	}

	componentDidMount(): void {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				this.setState({
					loggedIn: false,
					loaded: true,
				});
			} else {
				this.setState({
					loggedIn: true,
					loaded: true,
				});
			}
		});
	}

	render() {
		const { loggedIn, loaded } = this.state;

		if (!loaded) {
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text>Loading</Text>
				</View>
			);
		}

		if (!loggedIn) {
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Landing">
						<Stack.Screen
							name="Landing"
							component={LandingScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="Register" component={RegisterScreen} />
						<Stack.Screen name="Login" component={LoginScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			);
		}

		return (
			<Provider store={store}>
				<MainScreen />
			</Provider>
		);
	}
}

export default App;
