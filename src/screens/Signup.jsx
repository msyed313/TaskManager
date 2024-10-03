import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Text,
    TextInput,
    View,
    Pressable,
    Image,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from './Api';
const { width, height } = Dimensions.get('window')

const Signup = ({ navigation }) => {
    const [passView, setPassView] = useState(false);
    const [pname, setPname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('')

    const formdata = new FormData()
    formdata.append('Pname', pname)
    formdata.append('Email', email)
    formdata.append('Password', password)
    

    const signUp = async () => {
        try {
            const response = await fetch(`${Api}/User/SignUp`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formdata
            });
            const data = await response.json()
            if (response.ok) {
                console.log("Success: ", data);
                setEmail(''), setError(''), setPassword(''),
                    setPname('')
            }
            else {
                console.log("error: ", data);
                setError(data)

            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }


    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor="#1E293B" barStyle="light-content" />

            <View style={styles.v1}>
                <Text style={styles.t1}>Create new account</Text>
                <TextInput
                    placeholder="uname"
                    onChangeText={setPname}
                    value={pname}
                    style={styles.input} />
                {error ? <Text>{error.Pname}</Text> : null}
                <TextInput
                    placeholder="email"
                    onChangeText={setEmail}
                    value={email}
                    style={styles.input} />
                {error ? <Text>{error.email}</Text> : null}
                <TextInput
                    placeholder="password"
                    onChangeText={setPassword}
                    value={password}
                    style={[styles.input, { position: 'relative' }]}
                    secureTextEntry={passView ? false : true}
                />
                {error ? <Text>{error.password}</Text> : null}
                {passView ? (
                    <Pressable onPress={() => setPassView(false)}>
                        <Image
                            source={require('../assets/hide.png')}
                            style={styles.icon}
                        />
                    </Pressable>
                ) : (
                    <Pressable onPress={() => [setPassView(true)]}>
                        <Image
                            source={require('../assets/view.png')}
                            style={styles.icon}
                        />
                    </Pressable>
                )}
                <Pressable style={styles.press}  >
                    <Text style={styles.t2}>Signup</Text>
                </Pressable>
                <Text style={{ fontSize: width * 0.04 }}>or continue with</Text>
                <View style={styles.otherLoginView}>
                    <Pressable style={styles.otherLoginButton}>
                        <Text style={styles.otherLoginText}>Google</Text>
                    </Pressable>
                    <Pressable style={styles.otherLoginButton} >
                        <Text style={styles.otherLoginText}>Facebook</Text>
                    </Pressable>
                </View>

                <Pressable onPress={() => navigation.navigate('login')}>
                    <Text style={[styles.t1, { fontSize: width * 0.045 }]}>
                        Already have account ? Login
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#334155'
    },
    v1: {
        width: '100%',
        paddingHorizontal: 60,
        paddingVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        height: '70%',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100
    },
    t1: {
        fontSize: width * 0.06,
        color: 'black',
        fontWeight: '700',
        marginVertical: height * 0.03,
    },
    input: {
        fontSize: width * 0.05,
        padding: 10,
        marginVertical: height * 0.01,
        width: '100%',
        color: 'black',
        borderBottomWidth: 2
    },
    icon: {
        width: width * 0.08,
        height: height * 0.04,
        resizeMode: 'contain',
        position: 'absolute',
        top: -height * 0.05,
        right: -width * 0.33,
    },
    press: {
        backgroundColor: '#334155',
        paddingVertical: height * 0.01,
        width: '60%',
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    t2: {
        fontSize: width * 0.06,
        color: 'white',
    },
    otherLoginView: {
        width: '100%',
        //backgroundColor:'red',
        marginTop: height * 0.01,
        height: height * 0.08,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    otherLoginButton: {
        width: '45%',
        //backgroundColor:'#334155',
        height: height * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
    otherLoginText: {
        fontSize: width * 0.05,
        color: 'black',
        fontWeight: '700'
    }
});

export default Signup