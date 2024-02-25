import { route, routeOperation } from "next-rest-framework";
import { z } from "zod";
import { PartnerSchema } from "../../../../prisma/generated/zod";
import { middleware } from "@/middleware";
import { prisma } from "@/server/prisma";
import { Prisma } from "@prisma/client";
import Fuse from "fuse.js";
import { NextRequest, NextResponse } from "next/server";

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
                schema: z.null(),
            },
            {
                status: 200,
                contentType: "application/json",
                schema: z.array(PartnerSchema),
            },
        ])
        // .middleware(middleware)
        .handler(async (req) => {
            const res = await middleware(req as NextRequest);
            if (res instanceof NextResponse) return res;

            const user = res as Prisma.UserUncheckedCreateInput;
            const { search } = await req.json();

            const partners = await prisma.org.findUnique({
                where: {
                    id: user.orgId,
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
            })
                .search(search)
                .map((x) => x.item);

            return NextResponse.json(filtered, { status: 200 });
        }),

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
                data: { ...partner, orgId: user.orgId },
            });

            return NextResponse.json(result, { status: 200 });
        }),
});
