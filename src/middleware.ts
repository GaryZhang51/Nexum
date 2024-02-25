import { NextRequest, NextResponse } from "next/server";
import { getAuthorizationUrl, verifyJwtToken } from "./auth";

export async function middleware(request: NextRequest) {
    const { cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };

    const hasVerifiedToken = token && (await verifyJwtToken(token));
    // console.log(token, hasVerifiedToken, cookies);

    // Redirect unauthenticated users to the AuthKit flow
    if (!hasVerifiedToken) {
        const authorizationUrl = getAuthorizationUrl(request.url);
        const response = NextResponse.redirect(authorizationUrl);

        response.cookies.delete("token");

        return response;
    }

    return hasVerifiedToken;
}

// Match against the account page
export const config = { matcher: ["/account/:path*"] };
