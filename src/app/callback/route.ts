import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey, workos, getClientId } from "../../auth";
import { route, routeOperation } from "next-rest-framework";
import { z } from "zod";

export const { GET } = route({
    getJWT: routeOperation({
        method: "GET",
    })
        .outputs([
            {
                status: 200,
                contentType: "application/json",
                schema: z.any(),
            },
            {
                status: 500,
                contentType: "application/json",
                schema: z.object({
                    error: z.string(),
                }),
            },
            {
                status: 400,
                contentType: "application/json",
                schema: z.object({
                    error: z.string(),
                }),
            },
        ])
        .handler(async (request) => {
            const code = request.nextUrl.searchParams.get("code");
            console.log(code === null);
            if (code) {
                try {
                    // Use the code returned to us by AuthKit and authenticate the user with WorkOS
                    const { user } =
                        await workos.userManagement.authenticateWithCode({
                            clientId: getClientId(),
                            code,
                        });

                    // Create a JWT token with the user's information
                    const token = await new SignJWT({
                        // Here you might lookup and retrieve user details from your database
                        user,
                    })
                        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                        .setIssuedAt()
                        .setExpirationTime("1h")
                        .sign(getJwtSecretKey());

                    const url = request.nextUrl.clone();

                    // Cleanup params
                    url.searchParams.delete("code");

                    // Redirect to the requested path and store the session
                    url.pathname = "/";
                    const response = NextResponse.redirect(url);

                    response.cookies.set({
                        name: "token",
                        value: token,
                        path: "/",
                        httpOnly: true,
                        secure: true,
                        sameSite: "lax",
                    });

                    return response;
                } catch (error) {
                    const errorRes = {
                        status: 500,
                        error:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    };
                    console.error(errorRes);
                    return NextResponse.json(errorRes);
                }
            }

            return NextResponse.json({
                status: 400,
                error: "No authorization code was received from AuthKit",
            });
        }),
});
