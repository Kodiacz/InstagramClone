import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

interface ILoginProps {}

interface ILoginState {
	email: string;
	password: string;
}

export class Login extends Component<ILoginProps, ILoginState> {
	constructor(props: ILoginProps) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.onSignIn = this.onSignIn.bind(this);
	}

	onSignIn() {
		const { email, password }: ILoginState = this.state;

		console.log('Login.tsx - email => ', email);
		console.log('Login.tsx - password  => ', password);

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				console.log('Login.tsx - result => ', result);
			})
			.catch((error) => console.log(error));

		this.setState({
			email: '',
			password: '',
		});
	}

	render() {
		return (
			<View>
				<TextInput
					placeholder="email"
					onChangeText={(email: string) => this.setState({ email: email })}
				/>
				<TextInput
					placeholder="password"
					secureTextEntry={true}
					onChangeText={(password: string) =>
						this.setState({ password: password })
					}
				/>
				<Button
					title="Sign In"
					onPress={() => {
						this.onSignIn();
					}}
				/>
			</View>
		);
	}
}

export default Login;
