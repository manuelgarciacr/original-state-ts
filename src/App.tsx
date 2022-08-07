import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CountProvider, useCountState, useCountUpdater } from './state/StateContext';

type Data = {
    hor?: number
    ver?: number
}

function useRenderCounter() {
    const ref = React.useRef<HTMLSpanElement>(null);
    React.useEffect(() => {
        ref.current!.textContent = (Number(ref.current?.textContent || '0') + 1).toString();
    });
    return (
        <span
            style={{
                backgroundColor: '#ccc',
                borderRadius: 4,
                padding: '2px 4px',
                fontSize: '0.8rem',
                margin: '0 6px',
                display: 'inline-block',
            }}
            ref={ref}
        />
    );
}

const CountDisplay = React.memo(() => {
    const count: Data = useCountState();
    const renderCount = useRenderCounter();
    return (
        <div style={{ border: '1px solid black', padding: 10 }}>
            {renderCount}
            {`The current count is ${count.hor}. `}
        </div>
    );
});

const Counter = React.memo(() => {
    const increment: (v: Data) => void = useCountUpdater();
    const renderCount = useRenderCounter();
    return (
        <div style={{ border: '1px solid black', padding: 10 }}>
            {renderCount}
            <button onClick={() => increment({hor: Math.floor(Math.random() * 100)})}>Increment count</button>
        </div>
    );
});

const App = () => {
    const [, forceUpdate] = React.useState({});
    const renderCount = useRenderCounter();
    return (
        <div className="App">
            <header className="App-header">
                <p>Original TS</p>
                <img src={logo} className="App-logo" alt="logo" />
                <div style={{ border: '1px solid black', padding: 10 }}>
                    {renderCount}
                    <button onClick={() => forceUpdate({})}>force render</button>
                    <CountProvider<Data> state={{hor: 0}}>
                        <CountDisplay />
                        <Counter />
                    </CountProvider>
                </div>
            </header>
        </div>
    );
}

export default App;
