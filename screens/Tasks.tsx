import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Tasks() {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]);

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
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});
