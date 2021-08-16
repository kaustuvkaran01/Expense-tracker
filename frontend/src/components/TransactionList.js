import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

import Transaction from "./Transaction";

export default function TransactionList() {
	const { transactions, getTransactions } = useContext(GlobalContext);
	// console.log(context);
	useEffect(() => {
		getTransactions();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			<h3>History</h3>
			<ul id="list" className="list">
				{transactions.map((transaction) => {
					return <Transaction key={transaction.id} transaction={transaction} />;
				})}
			</ul>
		</div>
	);
}
