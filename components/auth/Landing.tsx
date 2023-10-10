import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'

interface ILandingProps {
  navigation: NavigationProp<ParamListBase>
}

export default function Landing({
  navigation,
}: ILandingProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title='Register'
        onPress={() => { navigation.navigate('Register') }}
      />
      <Button
        title='Login'
        onPress={() => { navigation.navigate('Login') }}
      />
    </View>
  )
}
