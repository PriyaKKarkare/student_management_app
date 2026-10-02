import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "../../../../lib/db";
import Student from "../../../../models/Student";

export async function GET(request, { params }) {
	try {
		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{
					message: "Invalid student ID",
				},
				{
					status: 400,
				}
			);
		}

		await connectDB();

		const student = await Student.findById(id);

		if (!student) {
			return NextResponse.json(
				{
					message: "Student not found",
				},
				{
					status: 404,
				}
			);
		}

		return NextResponse.json(student);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to fetch student",
			},
			{
				status: 500,
			}
		);
	}
}

export async function PUT(request, { params }) {
	try {
		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{
					message: "Invalid student ID",
				},
				{
					status: 400,
				}
			);
		}

		await connectDB();

		const body = await request.json();

		const updatedStudent = await Student.findByIdAndUpdate(
			id,
			body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!updatedStudent) {
			return NextResponse.json(
				{
					message: "Student not found",
				},
				{
					status: 404,
				}
			);
		}

		return NextResponse.json(updatedStudent);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to update student",
			},
			{
				status: 500,
			}
		);
	}
}

export async function DELETE(request, { params }) {
	try {
		const { id } = await params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{
					message: "Invalid student ID",
				},
				{
					status: 400,
				}
			);
		}

		await connectDB();

		const deletedStudent = await Student.findByIdAndDelete(id);

		if (!deletedStudent) {
			return NextResponse.json(
				{
					message: "Student not found",
				},
				{
					status: 404,
				}
			);
		}

		return NextResponse.json({
			message: "Student deleted successfully",
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to delete student",
			},
			{
				status: 500,
			}
		);
	}
}