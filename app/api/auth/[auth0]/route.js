import { handleAuth } from "@auth0/nextjs-auth0";

export async function GET(request) {
  // Create a context object manually
  const ctx = {
    params: {
      auth0: request.nextUrl.pathname.split("/").pop(),
    },
  };

  return handleAuth()(request, ctx);
}
