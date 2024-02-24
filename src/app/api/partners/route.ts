import { route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { PartnerSchema } from "../../../../prisma/generated/zod";
import { middleware } from "@/middleware";
import { prisma } from "@/server/prisma";
import { Prisma } from "@prisma/client";
import Fuse from "fuse.js";
import { NextResponse } from "next/server";

export const { GET, POST } = route({
    getPartners: routeOperation({
        method: "GET",
    })
        .input({
            contentType: "application/json",
            body: z.object({
                search: z.string(),
            }),
        })
        .outputs([
            {
                status: 403,
                contentType: "application/json",
                schema: z.unknown(),
            },
            {
                status: 200,
                contentType: "application/json",
                schema: z.array(PartnerSchema),
            },
        ])
        .middleware(middleware)
        .handler(async (req) => {
            const user: Prisma.UserCreateInput = JSON.parse(
                req.headers.get("x-user") ?? ""
            );

            const partners = await prisma.org.findUnique({
                where: {
                    id: user.org.connect?.id,
                },
                select: {
                    partners: true,
                },
            });

            if (partners === null) {
                return NextResponse.json([], { status: 200 });
            }
            const filtered = new Fuse(partners.partners, {
                keys: [
                    { name: "name", weight: 4 },
                    { name: "tags", weight: 2 },
                    "description",
                ],
            });

            return NextResponse.json(filtered, { status: 200 });
        }),

    addPartner: routeOperation({
        method: "POST",
    })
        .input({
            contentType: "application/json",
            body: PartnerSchema.omit({ orgId: true }),
        })
        .middleware(middleware)
        .handler(async (req) => {
            const user: Prisma.UserCreateInput = JSON.parse(
                req.headers.get("x-user") ?? ""
            );
            const partner = await req.json();

            await prisma.partner.create({
                data: { ...partner, orgId: user.org.connect?.id ?? "" },
            });
        }),
});
