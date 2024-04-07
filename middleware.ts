
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/webhook/clerk","/", "/dashboard","/404", "/api(.*)"],

  ignoredRoutes: ["/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/","/dashboard", "/(api|trpc)(.*)"],
};