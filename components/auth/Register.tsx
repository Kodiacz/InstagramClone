import React, { Component } from 'react'
import { Button, TextInput, View } from 'react-native'
import * as firebaseAuth from 'firebase/auth'

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
            firebaseAuth.createUserWithEmailAndPassword(firebaseAuth.getAuth(), email, password)
                .then((result) => {
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
