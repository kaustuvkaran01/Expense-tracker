const Transaction = require("../models/Transaction");
// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @public  Public
exports.getTransactions = async (req, res, next) => {
	try {
		const transactions = await Transaction.find();
		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

// @desc    Add transactions
// @route   POST /api/v1/transactions
// @public  Public
exports.addTransaction = async (req, res, next) => {
	try {
		const { text, amount } = req.body;
		console.log(text);
		console.log(amount);
		const transaction = await Transaction.create(req.body);
		return res.status(201).json({
			success: true,
			data: transaction,
		});
	} catch (err) {
		if (err.name === "ValidationError") {
			const messages = Object.values(err.errors).map((val) => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			res.status(500).json({
				success: false,
				error: "Server error",
			});
		}
	}
};

// @desc    Delete a transactions
// @route   DELETE /api/v1/transactions/:id
// @public  Public
exports.deleteTransaction = async (req, res, next) => {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			res.status(500).json({
				success: false,
				error: "Transaction does not exist",
			});
		}
		await transaction.remove();
		return res.status(200).json({
			success: true,
			data: {},
		});
	} catch (err) {
		console.log(err);
	}
};
