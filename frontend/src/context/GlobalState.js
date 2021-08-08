import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
// import Transaction from "../components/Transaction";
//create an init state

const initialState = {
	transactions: [],
};
// Create context with the name Global Context
export const GlobalContext = createContext(initialState);

//now we need to create a Provider component to wrap everything in

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	function deleteTransaction(id) {
		dispatch({
			type: "DELETE_TRANSACTION",
			payload: id,
		});
	}

	function addTransaction(transaction) {
		dispatch({
			type: "ADD_TRANSACTION",
			payload: transaction,
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
