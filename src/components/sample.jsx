import React, { useState, useEffect, useRef, useReducer, useContext, createContext, useMemo } from "react";
import Parent from "./parent";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        case "reset":
            return { count: 0 };
        default:
            return state;
    }
};

//example of useContext
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const ThemedComponent = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div style={{ background: theme === "light" ? "#fff" : "#333", padding: "20px", borderRadius: "10px" }}>
            <h2 style={{ color: theme === "light" ? "#000" : "#fff" }}>Current Theme: {theme}</h2>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle Theme</button>
        </div>
    );
};
//end   

//example of HOC 
const withBorder = (WrappedComponent) => {          // Higher-Order Component
    return (props) => (
        <div style={{ border: "2px solid red", padding: "10px" }}>
            <WrappedComponent {...props} />
        </div>
    );
};

const Message = ({ text }) => <h2>{text}</h2>;     // Normal Component

const MessageWithBorder = withBorder(Message);     // Component with Border
//end

const Counter = ({ initialCount }) => {

    const [count, setCount] = useState(initialCount);

    useEffect(() => {
    }, [count]);


    //example of useCallBack
    const Button = React.memo(({ handleClick }) => {
        return <button onClick={handleClick}>Increment persist</button>
    });
    //end


    //exapmle of useRef
    const inputRef = useRef(null);
    const focusInput = () => {
        inputRef.current.focus();
    };
    //end


    //example of useReducer
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    //end


    //example of useMemo
    const [number, setNumber] = useState(5);
    const expensiveCalculation = (num) => {
        return num * 10;
    };
    const memoizedValue = useMemo(() => expensiveCalculation(number), [number]);
    //end


    const name = "XXX Counter XXX";
    const increment = () => {
        setCount(count + 1);
    };
    const decrement = () => {
        setCount(count - 1);
    };


    //example of map
    const products = [
        { title: "Cabbage", id: 1 },
        { title: "Garlic", id: 2 },
        { title: "Apple", id: 3 },
    ];
    const listItems = products.map(product =>
        <li key={product.id}>{product.title}</li>
    );
    //end

    const isOnline = useOnlineStatus();

    return (
        <div>
            <h1>
                {name}: {count}
            </h1>

            <button onClick={increment}>Increment </button>

            <Button handleClick={increment} />

            <button onClick={decrement}>Decrement</button>

            <div>{count % 2 === 1 ? <h5>ODD</h5> : <h5>EVEN</h5>}</div>

            <div>
                <input ref={inputRef} type="text" placeholder="Type here..." />
                <button onClick={focusInput}>Focus Input</button>
            </div>

            <ul>{listItems}</ul>

            <Parent />


            <div className="p-5 bg-red-800 rounded-lg">
                <h2 className="pb-5">Count: {state.count}</h2>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => dispatch({ type: "increment" })}>+</button>
                    <button onClick={() => dispatch({ type: "decrement" })}>-</button>
                    <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
                </div>
            </div>


            <div className="mt-5">
                <ThemeProvider>
                    <ThemedComponent />
                </ThemeProvider>
            </div>
            <h3>Expensive Calculation: {memoizedValue}</h3>
            <button onClick={() => setNumber(number + 1)}>Change Number</button>

            <div>
                <MessageWithBorder text="Hello, HOC!" />
            </div>

            <div className="absolute top-0 right-0 p-5 font-bold">
                {isOnline ? <p className="text-green-500">Online</p> : <p className="text-red-500">Offline</p>} 
            </div>

            <Link to="new/about">About</Link>
            
        </div>
    );
};

export default Counter;
