import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { Prisma } from "@prisma/client";

// Initialize the WorkOS client
// export const workos = new WorkOS(process.env.WORKOS_API_KEY);

export function getClientId() {
    const clientId = process.env.WORKOS_CLIENT_ID;

    if (!clientId) {
        throw new Error("WORKOS_CLIENT_ID is not set");
    }

    return clientId;
}

export function getAuthorizationUrl(callback?: string | null) {
    const authorizationUrl =
        "/callback" /* temp */ + (callback ? "?callback=" + callback : "");

    return authorizationUrl;
}

export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
        throw new Error("JWT_SECRET_KEY is not set");
    }

    return new Uint8Array(Buffer.from(secret, "base64"));
}

export async function verifyJwtToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());

        return payload;
    } catch (error) {
        return null;
    }
}

export async function getUser(): Promise<{
    isAuthenticated: boolean;
    user?: Prisma.UserCreateInput | null;
}> {
    const token = cookies().get("token")?.value;
    const verifiedToken = token && (await verifyJwtToken(token));

    if (verifiedToken) {
        return {
            isAuthenticated: true,
            user: verifiedToken.user as Prisma.UserCreateInput | null,
        };
    }

    return { isAuthenticated: false };
}

export async function logOut() {
    cookies().delete("token");
    redirect("/");
}

export const pepper = Buffer.from(process.env.PEPPER ?? "");
