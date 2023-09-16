import React, { PropsWithChildren, useLayoutEffect } from "react";
import { AppContext } from "../store/appContext";
import { getData } from "../utils/getData";

export const AsyncStorageSynchronizer: React.FC<PropsWithChildren> = ({ children }) => {

    const { setList } = React.useContext(AppContext);

    useLayoutEffect(() => {
        getData('completed-tasks').then((data) => {
            setList(data);
        });
    }, []);

    return (
        children
    );
};