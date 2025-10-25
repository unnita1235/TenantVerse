
import { notFound } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function Page({ params }: { params: Promise<{ tenant?: string }> }) {
  const { tenant } = await params;

  // If tenant is missing or not a string, return 404
  if (!tenant || typeof tenant !== "string") {
    notFound();
  }

  // Render client-side dashboard
  return <DashboardClient tenant={tenant} />;
}
