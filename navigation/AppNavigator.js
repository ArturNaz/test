import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from '../screens/HomeScreen';
import CompleteScreen from '../screens/CompleteScreen';
const Stack = createStackNavigator();
export const navigationOptions = {
    headerStyle: {
        backgroundColor:'lightgray',
        height: 84,
        borderBottomColor: "transparent",
        shadowColor: 'transparent',
        elevation: 0, // for android

    },
    headerTintColor:  'black',
    headerBackTitleStyle:{
        color:'black'
    },
    headerTitleStyle: {
        //fontWeight: 'bold',
        fontSize:18,
    },
    headerBackTitleVisible: false,
    headerLeftContainerStyle: {
        alignItems: 'center',
        marginLeft: 12 * 2,
        paddingRight: 12,
    },
    headerRightContainerStyle: {
        alignItems: 'center',
        paddingRight: 12,
    },
}
class AppNavigator extends Component{
    render() {
        return (
            <NavigationContainer >
                <Stack.Navigator  screenOptions={navigationOptions} initialRouteName="Home" >
                            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
                            <Stack.Screen name="Complete" component={CompleteScreen} options={{headerShown:false}} />
                </Stack.Navigator>

            </NavigationContainer>
        );
    }
}

export default AppNavigator

