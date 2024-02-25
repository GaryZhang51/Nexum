import { getJwtSecretKey, pepper } from "@/auth";
import { prisma } from "@/server/prisma";
import { hash } from "argon2";
import { SignJWT } from "jose";
import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
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

            if (await prisma.user.findUnique({ where: { email } })) {
                return await TypedNextResponse.json(
                    "A user with this email already exists",
                    { status: 409 }
                );
            }

            const org = await prisma.org.create({
                data: {
                    name: `${name}'s organization`,
                },
            });

            const passwordHash = await hash(password, {
                secret: pepper,
            });

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    passwordHash,
                    orgId: org.id,
                },
            });

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
