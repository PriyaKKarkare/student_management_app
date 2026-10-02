import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Student from "../../../models/Student";

export async function GET() {
	try {
		await connectDB();

		const students = await Student.find();

		return NextResponse.json(students);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to fetch students",
			},
			{
				status: 500,
			}
		);
	}
}

export async function POST(request) {
	try {
		await connectDB();

		const body = await request.json();

		const student = await Student.create(body);

		return NextResponse.json(student, {
			status: 201,
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to create student",
			},
			{
				status: 500,
			}
		);
	}
}