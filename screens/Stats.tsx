import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../src/store/appContext';
import BackgroundComponent from '../src/components/BackgroundComponent';

export default function Stats() {
    const { tasksList } = React.useContext(AppContext);
    const completedTasksCount = tasksList.length;

    // Mock data
    const character = {
        name: "Gesar",
        job: "Warrior",
        title: "Hero of the Realm",
        level: 11,
        fatigue: 20,
        hp: 100,
        mp: 50,
        strength: 75,
        agility: 60,
        vitality: 80,
        sense: 65,
        intelligence: 50,
    };

    return (
        <BackgroundComponent>
            <View style={styles.infoContainer}>
                <Text style={styles.header}>Name: {character.name}</Text>
                <Text style={styles.info}>Job: {character.job}</Text>
                <Text style={styles.info}>Title: {character.title}</Text>
                <Text style={styles.info}>Level: {character.level}</Text>
                <Text style={styles.info}>Fatigue: {character.fatigue}%</Text>
                <Text style={styles.info}>HP: {character.hp}</Text>
                <Text style={styles.info}>MP: {character.mp}</Text>

                <View style={styles.separator} />

                <Text style={styles.header}>Stats:</Text>
                <Text style={styles.info}>Strength: {character.strength}</Text>
                <Text style={styles.info}>Agility: {character.agility}</Text>
                <Text style={styles.info}>Vitality: {character.vitality}</Text>
                <Text style={styles.info}>Sense: {character.sense}</Text>
                <Text style={styles.info}>Intelligence: {character.intelligence}</Text>
                <View style={styles.separator} />
                <Text style={styles.info}>Total tasks ever completed: {completedTasksCount}</Text>
            </View>
        </BackgroundComponent>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f4f4f4', // Or any other background color you prefer
    },
    characterImage: {
        width: '40%',
        height: '80%',
        resizeMode: 'contain',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
    separator: {
        borderBottomColor: '#fff',
        borderBottomWidth: 3,
        marginVertical: 10,
    }
});