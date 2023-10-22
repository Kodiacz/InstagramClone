import React, { Component } from 'react'
import { Button, TextInput, View } from 'react-native'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

interface IRegisterProps {

}

interface IRegisterState {
    email: string
    password: string,
    name: string,
    confirmPassword: string,
}

export class Register extends Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
        }

        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp() {
        const {
            email,
            password,
            name,
            confirmPassword
        }: IRegisterState = this.state;

        console.log(password, "password")
        console.log(confirmPassword, "confirmPassword")

        if (password === confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    firebase.firestore().collection("user")
                        .doc(firebase.auth().currentUser!.uid)
                        .set({
                            name,
                            email,
                        });
                    console.log(result)
                    this.setState({
                        email: '',
                        name: '',
                        password: '',
                        confirmPassword: '',
                    })
                })
                .catch((error) => console.log(error))
        } else {
            console.log('passwords are not equal');
            this.setState({
                ...this.state,
                password: '',
                confirmPassword: '',
            })
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder='name'
                    onChangeText={(name: string) => this.setState({ name: name })}
                    value={this.state.name}
                />
                <TextInput
                    placeholder='email'
                    onChangeText={(email: string) => this.setState({ email: email })}
                    value={this.state.email}

                />
                <TextInput
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(password: string) => this.setState({ password: password })}
                    value={this.state.password}

                />
                <TextInput
                    placeholder='confrim password'
                    secureTextEntry={true}
                    onChangeText={(confirmPassword: string) => this.setState({ confirmPassword: confirmPassword })}
                    value={this.state.confirmPassword}

                />
                <Button
                    title='Sign Up'
                    onPress={() => { this.onSignUp() }}
                />
            </View>
        )
    }
}

export default Register
