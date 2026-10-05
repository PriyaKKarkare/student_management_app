import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export async function POST(request) {
	try {
		await connectDB();

		const body = await request.json();

		const { name, email, password } = body;

		// Check required fields
		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 }
			);
		}

		// Check existing user
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 409 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		return NextResponse.json(
			{
				message: "User registered successfully",
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ message: "Registration failed" },
			{ status: 500 }
		);
	}
}