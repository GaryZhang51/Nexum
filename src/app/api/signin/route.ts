import { getJwtSecretKey, pepper } from "@/auth";
import { decryptFields, encryptFields } from "@/server/encryption";
import { prisma } from "@/server/prisma";
import { verify } from "argon2";
import { SignJWT } from "jose";
import { route, routeOperation } from "next-rest-framework";
import { NextResponse } from "next/server";
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
            let user = (await prisma.user.findMany()).filter(
                (u) => decryptFields({ e: u.email }).e === email
            )[0];

            if (
                user === null ||
                !(await verify(user.passwordHash, password, { secret: pepper }))
            ) {
                return NextResponse.json(null, { status: 401 });
            }

            user = decryptFields(user, ["id", "orgId", "passwordHash"]);
            console.log(user);

            const response = NextResponse.json(null, {
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
                secure: process.env.NODE_ENV != "development",
                sameSite: "lax",
            });

            return response;
        }),
});
