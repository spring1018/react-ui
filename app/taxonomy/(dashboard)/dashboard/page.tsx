import { options } from "@/app/_clients/nextAuth";
import { DashboardHeader } from "@/features/taxonomy/header";
import { PostCreateButton } from "@/features/taxonomy/post-create-button";
import { PostItem } from "@/features/taxonomy/post-item";
import { DashboardShell } from "@/features/taxonomy/shell";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession(options);

  const posts = await db.post.findMany({
    // where: {
    //   authorId: user.id,
    // },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div>
      {session?.user ? (
        <DashboardShell>
          <DashboardHeader heading="Posts" text="Create and manage posts.">
            <PostCreateButton />
          </DashboardHeader>
          <div>
            {posts?.length ? (
              <div className="divide-y divide-border rounded-md border">
                {posts.map((post: any) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div>
                You don&apos;t have any posts yet. Start creating content.
              </div>
            )}
          </div>
        </DashboardShell>
      ) : (
        <div>no session</div>
      )}
    </div>
  );
}
