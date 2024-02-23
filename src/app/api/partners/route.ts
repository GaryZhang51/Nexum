import { route, routeOperation } from "next-rest-framework";

export const { GET, POST } = route({
    getPartners: routeOperation({
        method: "GET",
    }).outputs([{ status: 403 }]),
});
