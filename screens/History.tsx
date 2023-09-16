import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { AppContext } from '../src/store/appContext';

export default function History() {
    const { tasksList, removeTask, setList } = React.useContext(AppContext);

    const handleDeleteTask = (taskName: string) => {
        removeTask(taskName);
    };

    // Render the FlatList ...

    return (
        <View>
            <FlatList
                data={tasksList}
                renderItem={({ item }) => (
                    <View style={styles.completedTaskContainer}>
                        <Text>{item}</Text>
                        <Button title="X" onPress={() => handleDeleteTask(item)} />
                    </View>
                )}
            />
            <Button title="Delete All History" onPress={() => setList([])} />
        </View>
    );
}

const styles = StyleSheet.create({
    completedTaskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});
