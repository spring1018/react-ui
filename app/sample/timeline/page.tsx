import Timeline from "@/components/organisms/Timeline";
import { comments } from "./data";

export default async function Page() {
  const data = comments.map((comment) => ({
    ...comment,
    content: JSON.stringify(comment.content),
  }));

  return (
    <div className="space-y-4">
      {data.map((comment) => (
        <Timeline
          key={comment.id}
          userName={comment.userId}
          date={comment.createdAt.toDateString()}
          tag={comment.tag}
          content={comment.content}
        />
      ))}
    </div>
  );
}
