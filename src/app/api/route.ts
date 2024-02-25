import { docsRoute } from "next-rest-framework";

export const { GET } = docsRoute({ allowedPaths: ["/api/**"] });
