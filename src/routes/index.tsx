import { createFileRoute } from "@tanstack/react-router";
import { NexusDashboard } from "@/components/nexus/NexusDashboard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <NexusDashboard />;
}
