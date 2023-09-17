import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

type BackgroundComponentProps = {
    children: React.ReactNode;
};

const BackgroundComponent: React.FC<BackgroundComponentProps> = ({ children }) => {
    return (
        <ImageBackground source={require('../../assets/bgimage.jpeg')} style={styles.background}>
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
});

export default BackgroundComponent;
