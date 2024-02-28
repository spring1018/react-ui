// import { redirect } from "next/navigation"
import { LoadingWrapper } from "@/components/molecules/LoadingWrapper"
import { DashboardHeader } from "@/features/taxonomy/header"
import { PostCreateButton } from "@/features/taxonomy/post-create-button"
import { PostItem } from "@/features/taxonomy/post-item"
import { DashboardShell } from "@/features/taxonomy/shell"
// import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
// import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
//   const user = await getCurrentUser()

//   if (!user) {
//     redirect(authOptions?.pages?.signIn || "/login")
//   }

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
  })

  return (
    <div>
      <LoadingWrapper>
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
    </LoadingWrapper>
    </div>
  )
}
