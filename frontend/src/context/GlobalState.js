import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
// import Transaction from "../components/Transaction";
//create an init state

const initialState = {
	transactions: [],
	errors: null,
	loading: true,
};
// Create context with the name Global Context
export const GlobalContext = createContext(initialState);

//now we need to create a Provider component to wrap everything in

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	//Actions
	async function getTransactions() {
		try {
			const res = await axios.get("/api/v1/transactions");

			dispatch({
				type: "GET_TRANSACTIONS",
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error,
			});
		}
	}
	async function deleteTransaction(id) {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);
			dispatch({
				type: "DELETE_TRANSACTION",
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error,
			});
		}
	}

	async function addTransaction(transaction) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post("/api/v1/transactions", transaction, config);
			dispatch({
				type: "ADD_TRANSACTION",
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error,
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				loading: state.loading,
				error: state.error,
				getTransactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
