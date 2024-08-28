import { Timeline } from "@/components/organisms/Timeline";
import { comments } from "./data";

export default async function Page() {
  const data = comments.map((comment) => ({
    ...comment,
    content: JSON.stringify(comment.content),
  }));

  return (
    <div className="space-y-4">
      <Timeline items={data} />
    </div>
  );
}
