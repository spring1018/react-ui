export async function GET() {
  function getIssues() {
    return fetch(
      "https://api.github.com/repos/spring1018/react-ui/issues?state=all&per_page=100",
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      },
    ).then((res) => res.json());
  }

  const issues = await getIssues();

  return Response.json(
    issues.map((issue) => ({
      title: issue.title,
      url: issue.html_url,
      state: issue.state,
      labels: issue.labels.map((label) => label.name),
    })),
  );
}
