import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export async function POST(request) {
	try {
		await connectDB();

		const body = await request.json();

		const { email, password } = body;

		// Check required fields
		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 }
			);
		}

		// Find user
		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 401 }
			);
		}

		// Compare password with hashed password
		const isPasswordCorrect = await bcrypt.compare(
			password,
			user.password
		);

		if (!isPasswordCorrect) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 401 }
			);
		}

		// Create JWT
		const token = jwt.sign(
			{
				userId: user._id.toString(),
				email: user.email,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		// Create response
		const response = NextResponse.json({
			message: "Login successful",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});

		// Store JWT in HTTP-only cookie
		response.cookies.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60,
			path: "/",
		});

		return response;
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ message: "Login failed" },
			{ status: 500 }
		);
	}
}