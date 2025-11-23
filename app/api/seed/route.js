import { seedTransactions } from "@/actions/seed";
import { revalidatePath } from "next/cache";

export async function GET() {
  const result = await seedTransactions();

  // Revalidate all relevant paths
  revalidatePath("/dashboard", "layout");
  revalidatePath("/account/[id]", "page");

  return Response.json(result);
}
