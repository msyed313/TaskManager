import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, Platform, StyleSheet, Dimensions, Pressable,Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
const { width, height } = Dimensions.get('window')
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";

const AddTask = ({navigation}) => {
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  useEffect(() => {
    checkAndCreateChannel();
  }, []);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const checkAndCreateChannel = async () => {
    const channelCreated = await AsyncStorage.getItem('channelCreated');
    if (!channelCreated) {
      PushNotification.createChannel(
        {
          channelId: "task-channel",
          channelName: "Task Notifications",
          channelDescription: "A channel to send Task notifications",
          importance: 4,
          vibrate: true,
          playSound: true,
          soundName: 'default',
        },
        (created) => {
          if (created) {
            AsyncStorage.setItem('channelCreated', 'true');
            console.log('Notification channel created');
          }
        }
      );
    }
  };

  const scheduleReminder = async () => {

    const reminderDate = new Date(date); // Set date and time
    reminderDate.setHours(time.getHours());
    reminderDate.setMinutes(time.getMinutes()-15);
    reminderDate.setSeconds(0);

    // Schedule the notification
    PushNotification.localNotificationSchedule({
      channelId: "task-channel",
      message: `${taskName}`, // Notification message
      date: reminderDate, // Date & time for the notification
      allowWhileIdle: true,
      title: "Task Reminder", // Set to 'day', 'week', etc. based on the repeatType
      data: {
        task: taskName,
        date: date.toDateString(),
      }
    });

    Alert.alert(`Reminder set for ${date.toDateString()}`);
  };

  const handleAddTask = () => {
    if (!taskName) {
      Alert.alert('Please enter a task name');
      return;
    }
  
    const currentDate = new Date();
    
    // Compare just the date part (set hours, minutes, and seconds to 0)
    const selectedDate = new Date(date.setHours(0, 0, 0, 0));
    const todayDate = new Date(currentDate.setHours(0, 0, 0, 0));
    
    if (selectedDate < todayDate) {
      Alert.alert('Error', 'Cannot set a task for a past date');
      return;
    }
  
    // If the date is today, check if the selected time is in the past
    if (selectedDate.getTime() === todayDate.getTime()) {
      if (date.getTime() < currentDate.getTime()) {
        Alert.alert('Error', 'Cannot set a task for a past time today');
        return;
      }
    }
  
    // Proceed to schedule the task
    scheduleReminder(); // Schedule notification when the task is added
    console.log('Task added:', taskName);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Ayat Schedule</Text>
      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />

      <Text style={styles.label}>Select Date</Text>
      <Pressable onPress={() => setShowDatePicker(true)} >
        <TextInput
          style={styles.input}
          editable={false}
          value={date.toDateString()}
          placeholder="Select Date"
        />
      </Pressable> 
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
     <Text style={styles.label}>Select Time</Text>
      <Pressable onPress={() => setShowTimePicker(true)} >
        <TextInput
          style={styles.input}
          editable={false}
          value={time.toLocaleTimeString()}
          placeholder="Select Date"
        />
      </Pressable>
      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
       
       <Pressable style={styles.send} onPress={handleAddTask} >
        <Text style={styles.sendText}>Add Task</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#334155',
  },
  heading: {
    fontSize: width * 0.08,
    fontWeight: '500',
    marginVertical: height * 0.02,
    color: 'blue',
    alignSelf:'center'
  },
  label: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginTop: height * 0.02,
    color: 'white',

  },
  input: {
    borderBottomWidth: 2,
    borderColor: 'white',
    marginTop: 10,
    fontSize: width * 0.05,
    color: 'black'
  },
  dateText: {
    fontSize: width * 0.05,
    marginTop: 10,
    color: 'black'
  },
  send: {
    backgroundColor: '#7E25D7',
    width: '50%',
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: width * 0.02,
    marginTop: height * 0.02,
    alignSelf:'center'
  },
  sendText: {
    fontSize: width * 0.055,
    color: 'white',
    fontWeight: '500'
  },
  backButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: 'teal',
    borderRadius: 10,
    width: width * 0.2,
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  backButtonText: {
    fontSize: width * 0.05,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddTask;
