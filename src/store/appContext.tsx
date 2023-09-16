import React from "react";
import { PropsWithChildren, useState } from "react";

type TAppContext = {
    tasksList: string[];
    addTask: (task: string) => void;
    removeTask: (task: string) => void;
    setList: (list: string[]) => void;
};


const initialState: TAppContext = {
    tasksList: [],
    addTask: () => { },
    removeTask: () => { },
    setList: () => { },
};

export const AppContext = React.createContext<TAppContext>(initialState);

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [tasksList, setTasksList] = useState<string[]>([]);

    const addTask = (task: string) => {
        setTasksList((prev) => [...prev, task]);
    };

    const removeTask = (task: string) => {
        setTasksList((prev) => prev.filter((item) => item !== task));
    };

    const setList = (list: string[]) => {
        setTasksList(list);
    };

    return (
        <AppContext.Provider
            value={{
                tasksList,
                addTask,
                removeTask,
                setList,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};