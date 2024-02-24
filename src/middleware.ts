import { NextRequest, NextResponse } from "next/server";
import { getAuthorizationUrl, verifyJwtToken } from "./auth";

export async function middleware(request: NextRequest) {
    const { cookies } = request;
    const { value: token } = cookies.get("token") ?? { value: null };

    const hasVerifiedToken = token && (await verifyJwtToken(token));

    // Redirect unauthenticated users to the AuthKit flow
    if (!hasVerifiedToken) {
        const authorizationUrl = getAuthorizationUrl(request.url);
        const response = NextResponse.redirect(authorizationUrl, {
            status: 403,
        });
        // const response = NextResponse.json(null, {
        //     status: 403,
        // });

        response.cookies.delete("token");

        return response;
    }

    const headers = new Headers(request.headers);

    headers.set("x-uer", JSON.stringify(hasVerifiedToken))

    return;
}

// Match against the account page
export const config = { matcher: ["/account/:path*"] };
