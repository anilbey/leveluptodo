import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { AppContext } from '../src/store/appContext';
import BackgroundComponent from '../src/components/BackgroundComponent';

export default function History() {
    const { tasksList, removeTask, setList } = React.useContext(AppContext);

    const handleDeleteTask = (taskName: string) => {
        removeTask(taskName);
    };

    // Render the FlatList ...

    return (
        <BackgroundComponent>
            <View style={styles.container}>
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
        </BackgroundComponent>
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
    container: {
        flex: 1,  // take whole available space
    }    
});
