import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "user email required"],
		unique: true,
	},
	username: {
		type: String,
		required: [true, "user username required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "user password required"],
	},
	courses: [
		{
			title: String,
			access: {
				is_paid: Boolean,
				is_instructor: Boolean,
				is_admin: Boolean,
			},
		},
	],
});

const User = mongoose.model("User", userSchema);
export default User;
