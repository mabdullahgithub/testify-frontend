import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path.startsWith("/signin") || path.startsWith("/signup");

  // Improved token retrieval with nullish coalescing operator
  const token = request.cookies.get("token")?.value ?? null;

  // Redirect based on authentication and path
  //
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/"],
};
