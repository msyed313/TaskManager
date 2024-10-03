import { View, Text, ImageBackground, StyleSheet, ScrollView, Dimensions, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import PushNotification from 'react-native-push-notification';

const { width, height } = Dimensions.get('window');

const Tasks = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [sortedNotifications, setSortedNotifications] = useState([]);

  useEffect(() => {
    //getSchedules();
    PushNotification.getScheduledLocalNotifications((notifications) => {
      console.log('Scheduled Notifications:', notifications);
      setNotifications(notifications);
      setSortedNotifications(notifications);
    });
  }, []);
  const handleDelete = (id) => {
    // Cancel the specific notification
    PushNotification.cancelLocalNotification({ id: id.toString() });

    // Update the state to remove the deleted notification from the list
    const updatedNotifications = notifications.filter((item) => item.id !== id);
    setNotifications(updatedNotifications);
    setSortedNotifications(updatedNotifications);
  };
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <ScrollView horizontal>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderView}>
              <Text style={styles.tableHeaderText}>Srno</Text>
              <Text style={styles.tableHeaderText}>Date</Text>
              <Text style={styles.tableHeaderText}>Topic</Text>
              <Text style={styles.tableHeaderText}>Time</Text>
              <Text style={styles.tableHeaderText}>Action</Text>
            </View>
            <ScrollView style={{ width: '100%' }}>
              {sortedNotifications.map((item, index) => {
                const date = new Date(item.date);
                date.setMinutes(date.getMinutes() + 15);

                // Get the updated time string
                const timeString = date.toLocaleTimeString();
                // const timeString = date.toLocaleTimeString();
                const dateString = date.toLocaleDateString()
                return (
                  <View key={index} style={[styles.tableRowView, index % 2 && styles.tableRowAlt]}>
                    <Text style={styles.tableRowText}>{index + 1}</Text>
                    <Text style={styles.tableRowText}>{dateString}</Text>
                    <Text style={styles.tableRowText}>{item.message}</Text>
                    <Text style={styles.tableRowText}>{timeString}</Text>
                    <View style={[styles.tableRowText, { flexDirection: 'row', justifyContent: 'center' }]}>
                      <Pressable style={styles.action} onPress={() => navigation.navigate('editschedule', { id: item.id })}>
                        <Image source={require('../assets/edit.png')} style={{ tintColor: 'blue' }} />
                      </Pressable>
                      <Pressable style={styles.action} onPress={() => handleDelete(item.id)}>
                        <Image source={require('../assets/delete.png')} style={{ tintColor: 'red' }} />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#334155'
  },
  container: {
    width: width, // Ensures the container spans the full screen width
    //paddingHorizontal: 2, // Optional padding
  },
  tableContainer: {
    width: width * 1.2, // Set a wider width for scrolling
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  tableHeaderView: {
    flexDirection: 'row',
    backgroundColor: '#28b5b5',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    justifyContent: 'space-around',
  },
  tableHeaderText: {
    fontSize: width * 0.06,
    color: 'black',
    fontWeight: 'bold',
    width: '25%',
    textAlign: 'center',
  },
  tableRowView: {
    flexDirection: 'row',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    justifyContent: 'space-evenly',
    height: height * 0.1,
    alignItems: 'center'
  },
  tableRowAlt: {
    backgroundColor: '#f2f2f2',
  },
  tableRowText: {
    fontSize: width * 0.045,
    color: 'black',
    fontWeight: 'bold',
    width: '25%',
    textAlign: 'center',
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: '40%'
  },
  actionButtonText: {
    fontSize: width * 0.045,
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
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
  },
});
export default Tasks