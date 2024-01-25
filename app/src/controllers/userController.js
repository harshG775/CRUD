import User from "../models/userModels.js";
const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find();
		res.status(200).json({
			message: "Response.success",
			count: allUsers.length,
			data: {
				users: allUsers,
			},
		});
	} catch (err) {
		res.status(404).json({
			message: "Response.error",
			count: 0,
			error: err,
		});
	}
};
const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({
				message: "Response.error",
				count: 0,
				error: "User not found",
			});
		}
		res.status(200).json({
			message: "Response.success",
			count: 1,
			data: {
				user: user,
			},
		});
	} catch (err) {
		res.status(500).json({
			message: "Response.error",
			count: 0,
			error: err.message,
		});
	}
};

const createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({
			message: "Response.success",
			count: 1,
			data: {
				user: user,
			},
		});
	} catch (err) {
		res.status(500).json({
			message: "Response.error",
			count: 0,
			error: err.message,
		});
	}
};

const updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!user) {
			return res.status(404).json({
				message: "Response.error",
				count: 0,
				error: "User not found",
			});
		}
		res.status(200).json({
			message: "Response.success",
			count: 1,
			data: {
				user: user,
			},
		});
	} catch (err) {
		res.status(500).json({
			message: "Response.error",
			count: 0,
			error: err.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({
				message: "Response.error",
				count: 0,
				error: "User not found",
			});
		}
		res.status(200).json({
			message: "Response.success",
			count: 1,
			data: {
				user: user,
			},
		});
	} catch (err) {
		res.status(500).json({
			message: "Response.error",
			count: 0,
			error: err.message,
		});
	}
};

export default {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
