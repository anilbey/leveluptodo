import React, { useState } from 'react';
import { View, TouchableOpacity, Image, TextInput, Button, Dimensions } from 'react-native';
import { AppContext } from '../src/store/appContext';

const kamImages = [
    require('../assets/kam1.png'),
    require('../assets/kam2.png'),
    require('../assets/kam3.png'),
    require('../assets/kam4.png'),
];

type CharacterSetupProps = {
    onComplete: () => void;
};

export default function CharacterSetup({ onComplete }: CharacterSetupProps) {
    const { setCharacterData } = React.useContext(AppContext);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = async () => {
        if (name && selectedImage) {
            setCharacterData({ name, image: selectedImage });
            onComplete();
        }
    };

    const halfScreenWidth = Dimensions.get('window').width / 2;

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Enter Character Name"
                value={name}
                onChangeText={setName}
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                    {kamImages.slice(0, 2).map((img, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{ flex: 1 }}
                            onPress={() => setSelectedImage(`kam${index + 1}.png`)}
                        >
                            <Image
                                source={img}
                                style={{
                                    width: halfScreenWidth,
                                    height: halfScreenWidth,
                                    opacity: selectedImage === `kam${index + 1}.png` ? 1 : 0.5
                                }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {kamImages.slice(2, 4).map((img, index) => (
                        <TouchableOpacity
                            key={index + 2}
                            style={{ flex: 1 }}
                            onPress={() => setSelectedImage(`kam${index + 3}.png`)}
                        >
                            <Image
                                source={img}
                                style={{
                                    width: halfScreenWidth,
                                    height: halfScreenWidth,
                                    opacity: selectedImage === `kam${index + 3}.png` ? 1 : 0.5
                                }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}
