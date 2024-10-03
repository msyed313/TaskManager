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

const Login = ({navigation}) => {
    const [passView, setPassView] = useState(false);
    const [pname, setPname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
          //const response = await fetch(`${Api}/User/Login?pname=${pname}&password=${password}`);
          //const data = await response.json();
         // const pid=data.Pid;
          if (pname=='msyed' & password=='msyed') {
            // Save player information in async storage
            const data={'name':pname,'password':password}
             try {
              await AsyncStorage.setItem('user', JSON.stringify(data));
              navigation.navigate('home')
              console.log('stored with data:',data);
               } catch (e) {
              console.log(e)
             } 
          } else {
            //console.log('Error', data);
            setError('username or password is incorrect')
            console.log(error);
            
          }
          
        } catch (error) {
          console.log('Error', 'An error occurred while logging in.');
          //console.error('Login Error:', error);
        }
      };

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar backgroundColor="#1E293B" barStyle="light-content" />

            <View style={styles.v1}>
                <Text style={styles.t1}>Login to your account</Text>
                {error ? <Text style={{ fontSize: 15, color: 'red', textAlign: 'center' }}>{error}</Text> : null}
                <TextInput
                    placeholder="uname"
                    onChangeText={setPname}
                    value={pname}
                    style={styles.input} />
                <TextInput
                    placeholder="password"
                    onChangeText={setPassword}
                    value={password}
                    style={[styles.input, { position: 'relative' }]}
                    secureTextEntry={passView ? false : true}
                />
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
                <Pressable style={styles.press} onPress={handleLogin} >
                    <Text style={styles.t2}>login</Text>
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

                <Pressable onPress={() => navigation.navigate('signup')}>
                    <Text style={[styles.t1, { fontSize: width * 0.045 }]}>
                        Don't have account ? Signup
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
        height: '60%',
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
    otherLoginView:{
        width:'100%',
        //backgroundColor:'red',
        marginTop:height*0.01,
        height:height*0.08,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    otherLoginButton:{
        width:'45%',
        //backgroundColor:'#334155',
        height:height*0.06,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor:'black'
    },
    otherLoginText:{
        fontSize:width*0.05,
        color:'black',
        fontWeight:'700'
    }
});
export default Login