import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Home from '../screens/Home'
import Tasks from '../screens/Tasks'
import AddTask from '../screens/AddTask'
const stack = createNativeStackNavigator()
const Navigation = () => {
    return (
        <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }}>
                <stack.Screen name='splash' component={SplashScreen} />
                <stack.Screen name='login' component={Login} />
                <stack.Screen name='tasks' component={Tasks}/>
                <stack.Screen name='signup' component={Signup} />
                <stack.Screen name='main' component={Home} />
                <stack.Screen name='addtask' component={AddTask} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation