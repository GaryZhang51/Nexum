import { middleware } from "@/middleware";
import { Prisma } from "@prisma/client";
import { route, routeOperation } from "next-rest-framework";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PartnerSchema } from "../../../../prisma/generated/zod";
import { prisma } from "@/server/prisma";
import { decryptFields } from "@/server/encryption";
import Fuse from "fuse.js";

export const { POST } = route({
    getPartners: routeOperation({
        method: "POST",
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

            const searchResult = await prisma.org.findUnique({
                where: {
                    id: user.orgId,
                },
                select: {
                    partners: true,
                },
            });

            if (searchResult === null) {
                return NextResponse.json([], { status: 200 });
            }

            const partners = searchResult.partners.map((x) =>
                decryptFields(x, ["id", "orgId"])
            );

            const filtered = new Fuse(partners, {
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
});
