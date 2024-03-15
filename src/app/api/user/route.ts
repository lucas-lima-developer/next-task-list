import { createUser } from "@/lib/actions";

export async function GET(request: Request) {
  const user = await createUser();

  return Response.json(user);
}