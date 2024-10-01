import { redirect, json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  return redirect("/", {
    headers: {
      "Set-Cookie": "jwt=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict",
    },
  });
};

export const loader = async () => {
  return json({});
};