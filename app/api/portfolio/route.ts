export async function GET() {
  function getIssues() {
    return fetch("https://api.github.com/repos/spring1018/root/issues", {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }).then((res) => res.json());
  }

  const issues = await getIssues();
  return Response.json(issues);
}
