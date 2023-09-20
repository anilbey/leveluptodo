import React from "react";
import { PropsWithChildren, useState } from "react";

type TAppContext = {
    tasksList: string[];
    addTask: (task: string) => void;
    removeTask: (task: string) => void;
    setList: (list: string[]) => void;
    characterData: {
        name: string;
        image: string;
    } | null;
    setCharacterData: (data: { name: string; image: any }) => void;
};


const initialState: TAppContext = {
    tasksList: [],
    addTask: () => { },
    removeTask: () => { },
    setList: () => { },
    characterData: null,
    setCharacterData: () => { }
};

export const AppContext = React.createContext<TAppContext>(initialState);

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [tasksList, setTasksList] = useState<string[]>([]);
    const [characterData, setCharacterDataState] = useState<{ name: string, image: string } | null>(null);

    const addTask = (task: string) => {
        setTasksList((prev) => [...prev, task]);
    };

    const removeTask = (task: string) => {
        setTasksList((prev) => prev.filter((item) => item !== task));
    };

    const setList = (list: string[]) => {
        setTasksList(list);
    };

    const setCharacterData = (data: { name: string; image: string }) => {
        setCharacterDataState(data);
    };

    return (
        <AppContext.Provider
            value={{
                tasksList,
                addTask,
                removeTask,
                setList,
                characterData,
                setCharacterData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};