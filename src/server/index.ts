import { router } from "./trpc";
import prisma from "./prisma";

const appRouter = router({
    // ...
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
