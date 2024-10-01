import { redirect } from "@remix-run/node";


export async function logout(request: Request) {
  return redirect("/", {
    headers: {
      "Set-Cookie": "jwt=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax; Secure",
    },
  });
}