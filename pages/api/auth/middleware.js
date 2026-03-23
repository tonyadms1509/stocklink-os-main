import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  if (!token) return Response.redirect(new URL("/login", req.url));

  const path = req.nextUrl.pathname;

  if (path.startsWith("/admin") && token.role !== "Admin") {
    return Response.redirect(new URL("/unauthorized", req.url));
  }
  if (path.startsWith("/contractor") && token.role !== "Contractor") {
    return Response.redirect(new URL("/unauthorized", req.url));
  }
  if (path.startsWith("/supplier") && token.role !== "Supplier") {
    return Response.redirect(new URL("/unauthorized", req.url));
  }
  if (path.startsWith("/logistics") && token.role !== "Logistics") {
    return Response.redirect(new URL("/unauthorized", req.url));
  }
  if (path.startsWith("/driver") && token.role !== "Driver") {
    return Response.redirect(new URL("/unauthorized", req.url));
  }
}
