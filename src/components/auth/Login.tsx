import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';

// firebase
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

	componentDidCatch(): void {
		this.setState({
			email: '',
			password: '',
		});
	}

	onSignIn() {
		const { email, password }: ILoginState = this.state;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {})
			.catch((error) => {
				this.setState({
					email: '',
					password: '',
				});
				console.log(error);
			});
	}

	render() {
		return (
			<View>
				<TextInput
					placeholder="email"
					value={this.state.email}
					onChangeText={(email: string) => this.setState({ email: email })}
				/>
				<TextInput
					placeholder="password"
					value={this.state.password}
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
