import { getJwtSecretKey, pepper } from "@/auth";
import { decryptFields, encryptFields } from "@/server/encryption";
import { prisma } from "@/server/prisma";
import { hash } from "argon2";
import { SignJWT } from "jose";
import { route, routeOperation } from "next-rest-framework";
import { NextResponse } from "next/server";
import { z } from "zod";

export const { POST } = route({
    signUp: routeOperation({ method: "POST" })
        .input({
            contentType: "application/json",
            body: z.object({
                name: z.string(),
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
                status: 409,
                contentType: "application/json",
                schema: z.string(),
            },
        ])
        .handler(async (req) => {
            const { name, email, password } = await req.json();

            if (
                (await prisma.user.findMany()).filter(
                    (u) => decryptFields({ e: u.email }).e === email
                ).length
            ) {
                return NextResponse.json(
                    "A user with this email already exists",
                    { status: 409 }
                );
            }

            const passwordHash = await hash(password, {
                secret: pepper,
            });

            const user = await prisma.user.create({
                data: encryptFields(
                    {
                        name,
                        email,
                        passwordHash,
                        org: {
                            create: encryptFields({
                                name: `${name}'s organization`,
                            }),
                        },
                    },
                    ["passwordHash", "org"]
                ),
            });

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
