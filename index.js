import React, { useState, useEffect } from 'react';
import { AppRegistry, Modal, View, Text, Button, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';

let setIsModalVisible;
let setTaskDetails;

PushNotification.configure({
    onNotification: async function (notification) {
        console.log('Notification:', notification);
        
        const { task, date } = notification.data;  // Extract task and date from notification
        setTaskDetails({ task, date });            // Set task details in state
        setIsModalVisible(true);                   // Show the modal
    },
    requestPermissions: Platform.OS === 'ios',
});

// Modal Component for Task Details
const TaskModal = ({ isVisible, taskDetails, onClose }) => (
    <Modal
        transparent={true}
        visible={isVisible}
        animationType="slide"
        onRequestClose={onClose}
    >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: '90%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                <Text style={{ fontSize: 25, marginBottom: 10, color: 'black', fontWeight: '500', alignSelf: 'center' }}>Task Details</Text>
                {taskDetails ? (
                    <>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={{ fontSize: 22, marginBottom: 10, color: 'black', width: '30%', fontWeight: '500' }}>Task</Text>
                            <Text style={{ fontSize: 20, marginBottom: 10, color: 'black', width: '70%' }}>{taskDetails.task}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Text style={{ fontSize: 22, marginBottom: 10, color: 'black', width: '30%', fontWeight: '500' }}>Date</Text>
                            <Text style={{ fontSize: 20, marginBottom: 10, color: 'black', width: '70%' }}>{taskDetails.date}</Text>
                        </View>
                    </>
                ) : (
                    <Text>No Task Found</Text>
                )}
                <Button title="Close" onPress={onClose} />
            </View>
        </View>
    </Modal>
);

const MainApp = () => {
    const [taskDetails, _setTaskDetails] = useState(null);
    const [isModalVisible, _setIsModalVisible] = useState(false);

    useEffect(() => {
        // Assign global setters
        setTaskDetails = _setTaskDetails;
        setIsModalVisible = _setIsModalVisible;
    }, []);

    return (
        <>
            <App />
            <TaskModal
                isVisible={isModalVisible}
                taskDetails={taskDetails}
                onClose={() => setIsModalVisible(false)}
            />
        </>
    );
};

AppRegistry.registerComponent(appName, () => MainApp);
