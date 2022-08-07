import React from 'react';

const CountStateContext = React.createContext<object | undefined>(undefined);
const CountUpdaterContext = React.createContext<React.Dispatch<React.SetStateAction<object>> | undefined>(undefined);

const CountProvider = <Data extends object>(props: {state: Data, children: JSX.Element | JSX.Element[]}) => {
    const [count, setCount] = React.useState<Data>(props.state);
    return (
        <CountStateContext.Provider value={count}>
            <CountUpdaterContext.Provider value={setCount as React.Dispatch<React.SetStateAction<object>>}>
                {props.children}
            </CountUpdaterContext.Provider>
        </CountStateContext.Provider>
    );
}

function useCountState() {
    const countState = React.useContext(CountStateContext);
    if (typeof countState === 'undefined') {
        throw new Error('useCountState must be used within a CountProvider');
    }
    return countState;
}

const useCountUpdater = <T extends object>() => {
    const setCount = React.useContext(CountUpdaterContext);
    if (typeof setCount === 'undefined') {
        throw new Error('useCountUpdater must be used within a CountProvider');
    }
    const increment = React.useCallback((n: T) => setCount((c) => ({...c, ...n})), [setCount]);
    return increment
}

export { CountProvider, useCountState, useCountUpdater };
