import { route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { PartnerSchema } from "../../../../prisma/generated/zod";
import { middleware } from "@/middleware";
import { prisma } from "@/server/prisma";
import { Prisma } from "@prisma/client";
import Fuse from "fuse.js";
import { NextRequest, NextResponse } from "next/server";
import { decryptFields, encryptFields } from "@/server/encryption";

export const { POST } = route({
    addPartner: routeOperation({
        method: "POST",
    })
        .input({
            contentType: "application/json",
            body: PartnerSchema.omit({
                id: true,
                orgId: true,
                img: true,
                createdAt: true,
                updatedAt: true,
            }),
        })
        .outputs([
            {
                status: 403,
                contentType: "application/json",
                schema: z.null(),
            },
            {
                status: 200,
                contentType: "application/json",
                schema: PartnerSchema,
            },
        ])
        // .middleware(middleware)
        .handler(async (req) => {
            const res = await middleware(req as NextRequest);
            if (res instanceof NextResponse) return res;

            const user = res.user as Prisma.UserUncheckedCreateInput;
            const partner = await req.json();
            console.log(user);

            const result = await prisma.partner.create({
                data: encryptFields({ ...partner, orgId: user.orgId }, [
                    "orgId",
                ]),
            });

            return NextResponse.json(result, { status: 200 });
        }),
});
