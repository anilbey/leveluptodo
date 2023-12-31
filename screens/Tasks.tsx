import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { AppContext } from '../src/store/appContext';
import { getData } from '../src/utils/getData';
import BackgroundComponent from '../src/components/BackgroundComponent';


export default function Tasks() {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]);
    const [checkedTasks, setCheckedTasks] = useState<string[]>([]);

    const { addTask } = React.useContext(AppContext);

    const handleAddTask = () => {
        if (task.trim() !== '') {
            // Check if task already exists
            if (tasks.includes(task.trim())) {
                alert("Task already exists!"); // warning popup
                return;
            }

            const updatedTasks = [...tasks, task.trim()];
            setTasks(updatedTasks);
            setTask('');
            asyncStoreData('active-tasks', updatedTasks);
        }
    };

    const asyncStoreData = async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            console.log('storing', jsonValue);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
    };


    const handleTaskCompletion = (taskName: string) => {
        const updatedTasks = tasks.filter(task => task !== taskName);
        const newCompletedTasks = [...checkedTasks, taskName];
        setTasks(updatedTasks);
        setCheckedTasks(newCompletedTasks);
        asyncStoreData('active-tasks', updatedTasks);
        asyncStoreData('completed-tasks', newCompletedTasks);
        addTask(taskName);
    };

    // once at the component mount
    useEffect(() => {
        getData('active-tasks').then((data) => { data ? setTasks(data) : setTasks([]) });
    }, [])

    return (
        <>
            <BackgroundComponent>
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
            </BackgroundComponent>
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
        borderBottomWidth: 1,
    },
    checkbox: {
        marginRight: 10,  // space btw. checkbox and task text
    },

});
