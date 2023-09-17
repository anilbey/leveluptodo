import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../src/store/appContext';
import BackgroundComponent from '../src/components/BackgroundComponent';

export default function Stats() {
    const { tasksList } = React.useContext(AppContext);
    const completedTasksCount = tasksList.length;

    return (
        <BackgroundComponent>
            <View style={styles.container}>
                <Text style={styles.header}>Stats</Text>
                <Text style={styles.info}>Total tasks ever completed: {completedTasksCount}</Text>
            </View>
        </BackgroundComponent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    info: {
        fontSize: 18
    }
});
