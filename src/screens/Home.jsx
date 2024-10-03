import { View, Text, StyleSheet, SafeAreaView, Pressable, Dimensions } from 'react-native'
import React from 'react'
import Navigation from '../navigation/Navigation'
const {width,height}=Dimensions.get('window')
const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main} >
        <Pressable style={styles.button} onPress={()=>navigation.navigate('tasks')}>
             <Text style={styles.buttonText}>Remaining Tasks</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={()=>navigation.navigate('addtask')}>
             <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'#334155',
        alignItems:'center'
    },
    button:{
        backgroundColor:'#7E25D7',
        width:'50%',
        height:height*0.06,
        marginVertical:height*0.02,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    },
    buttonText:{
        fontSize:width*0.05,
        color:'white'
    }
})
export default Home