import { getJwtSecretKey, pepper } from "@/auth";
import { prisma } from "@/server/prisma";
import { verify } from "argon2";
import { SignJWT } from "jose";
import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";

export const { POST } = route({
    signIn: routeOperation({ method: "POST" })
        .input({
            contentType: "application/json",
            body: z.object({
                email: z.string(),
                password: z.string(),
            }),
        })
        .outputs([
            {
                status: 200,
                contentType: "application/json",
                schema: z.null(),
            },
            {
                status: 401,
                contentType: "application/json",
                schema: z.null(),
            },
        ])
        .handler(async (req) => {
            const { email, password } = await req.json();
            const user = await prisma.user.findUnique({ where: { email } });

            if (
                user === null ||
                !(await verify(user.passwordHash, password, { secret: pepper }))
            ) {
                return await TypedNextResponse.json(null, { status: 401 });
            }

            const response = await TypedNextResponse.json(null, {
                status: 200,
            });

            const token = await new SignJWT({
                user,
            })
                .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                .setIssuedAt()
                .setExpirationTime("1h")
                .sign(getJwtSecretKey());

            response.cookies.set({
                name: "token",
                value: token,
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            });

            return response;
        }),
});
