import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button
} from 'react-native';

import { MonoText } from '../components/StyledText';
import styles from '../constants/AuthStyles';

export default function LoginScreen(props) {

    const [textState, setTextState] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
      })

    const signUpButton = (
        <Text onPress={() => props.navigation.navigate("Login")} style={{ color: 'blue' }}>
            Sign up
        </Text>
    )

    return (
      <ImageBackground source={require('../assets/images/katie-moum-GsVvcyoX6VY-unsplash.jpg')} style={{width: '100%', height: '100%'}}>
        {/* <View style={styles.container}> */}
            <ScrollView
            keyboardShouldPersistTaps='never'
            // style={styles.container}
            contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>
                    Sign up
                </Text>
                <TextInput
                    style={styles.textInput}
                    id="username"
                    onChangeText={username => setTextState({...textState, username})}
                    placeholder={'Username'}
                    value={textState.username}
                />
                <TextInput
                    style={styles.textInput}
                    id="email"
                    onChangeText={email => setTextState({...textState, email})}
                    placeholder={'Email'}
                    value={textState.email}
                />
                <TextInput
                    style={styles.textInput}
                    id="password"
                    secureTextEntry={true}
                    onChangeText={password => setTextState({...textState, password})}
                    placeholder={'Password'}
                    value={textState.password}
                />
                <TextInput
                    style={styles.textInput}
                    id="confirm"
                    secureTextEntry={true}
                    onChangeText={confirm => setTextState({...textState, confirm})}
                    placeholder={'Confirm password'}
                    value={textState.confirm}
                />
                <Button title="Sign up" onPress={() => props.navigation.navigate("Login")} color="#009933" />
            </ScrollView>
        {/* </View> */}
        </ImageBackground>
    );
}

LoginScreen.navigationOptions = {
  header: null,
};


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   body: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     paddingTop: 200,
//   },
//   title: {
//     fontSize: 30,
//     textAlign: 'center',
//   },
// });
