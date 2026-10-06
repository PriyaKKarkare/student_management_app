import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function proxy(request) {
	const token = request.cookies.get("token")?.value;

	console.log("PROXY TOKEN:", !!token);

	if (!token) {
		console.log("PROXY: NO TOKEN");
		return NextResponse.redirect(
			new URL("/login", request.url)
		);
	}

	const decoded = verifyToken(token);

	console.log("PROXY DECODED:", decoded);

	if (!decoded) {
		console.log("PROXY: INVALID TOKEN");
		return NextResponse.redirect(
			new URL("/login", request.url)
		);
	}

	console.log("PROXY: TOKEN VALID");

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};