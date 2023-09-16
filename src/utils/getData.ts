import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (url: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(url);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.error(e);
    }
}