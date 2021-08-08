import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
//create an init state

const initialState = {
	transactions: [
		{ id: 1, text: "Flower", amount: -20 },
		{ id: 2, text: "Salary", amount: 300 },
		{ id: 3, text: "Book", amount: -10 },
		{ id: 4, text: "Camera", amount: 150 },
	],
};
// Create context with the name Global Context
export const GlobalContext = createContext(initialState);

//now we need to create a Provider component to wrap everything in

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
