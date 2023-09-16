import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';


export default function Tasks() {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]);
    const [checkedTasks, setCheckedTasks] = useState<string[]>([]);

    const handleAddTask = () => {
    
        if (task.trim() !== '') {
            const updatedTasks = [...tasks, task.trim()];
            setTasks(updatedTasks   );
            setTask('');
            storeData(updatedTasks);
        }
    };


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            console.log('storing',jsonValue);
            await AsyncStorage.setItem('my-key', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-key');
            console.log('reading',jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
    
        } catch (e) {
            // error reading value
        }
    };

    // Add another async storage function for completed tasks
    const storeCompletedData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('completed-tasks', jsonValue);
        } catch (e) {
            // saving error
        }
    };


    const handleTaskCompletion = (taskName: string) => {
        const updatedTasks = tasks.filter(task => task !== taskName);
        setTasks(updatedTasks);
        setCheckedTasks(prev => [...prev, taskName]);
        storeData(updatedTasks);
        storeCompletedData(checkedTasks);
    };

    // once at the app launch
    useEffect(() => {  
        getData().then((data) => { data? setTasks(data):setTasks([])});
    }, [])

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={task}
                    onChangeText={setTask}
                    placeholder="Enter a task"
                />
                <Button title="Add" onPress={handleAddTask} />
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item, index) => item.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Checkbox style={styles.checkbox} value={false} onValueChange={() => handleTaskCompletion(item)} />
                        <Text>{item}</Text>
                    </View>
                )}                
            />
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        padding: 5,
    },
    taskContainer: {
        flexDirection: 'row',  // Set direction of inner items to horizontal
        alignItems: 'center',  // Vertically align items to the middle
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 5,
    },
    checkbox: {
        marginRight: 10,  // space btw. checkbox and task text
    },
    
});
