import { View, Text, StyleSheet, ImageBackground, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect,useState } from 'react';
const { width, height } = Dimensions.get('window')
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({navigation}) => {
    const [login, setLogin] = useState(false);
    const _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          setTimeout(() => {
            if (value !== null) {
              console.log(value);
              navigation.navigate('home');
            } else {
              navigation.navigate('login');
            }
          }, 1000);
        } catch (error) {
          // Error retrieving data
        }
      };
    
      useEffect(() => {
        _retrieveData();
      }, []);
    return (
        <SafeAreaView style={styles.v1}>
            <StatusBar backgroundColor="#334155" barStyle="light-content" />
            <Text style={styles.t1}>{'Task Manager'}</Text>
            <Text style={styles.t2}>Manage ur task here</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    v1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#334155',
    },
    t1: {
        fontSize: width * 0.08,
        color: '#F1DF01',
        fontWeight: '700',
        textAlign: 'center', // Ensure text is centered
    },
    t2: {
        fontSize: width * 0.04,
        marginTop: height * 0.02,
        color: 'white',
        textAlign: 'center', // Ensure text is centered
    },
});
export default SplashScreen