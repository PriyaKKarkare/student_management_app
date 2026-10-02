import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import { verifyToken } from "../../../../lib/auth";

export async function GET() {
	try {
		const cookieStore = await cookies();

		const token = cookieStore.get("token")?.value;

		if (!token) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const decoded = verifyToken(token);

		if (!decoded) {
			return NextResponse.json(
				{ message: "Invalid or expired token" },
				{ status: 401 }
			);
		}

		await connectDB();

		const user = await User.findById(decoded.userId).select(
			"-password"
		);

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ message: "Failed to get user" },
			{ status: 500 }
		);
	}
}