export async function GET() {
  async function getIssues() {
    if (!process.env.GITHUB_TOKEN) {
      console.log("GITHUB_TOKEN is not set. Returning dummy data.");
      return [
        {
          title: "Dummy Issue 1",
          url: "https://example.com/issue1",
          state: "open",
          labels: ["bug", "help wanted"],
        },
        {
          title: "Dummy Issue 2",
          url: "https://example.com/issue2",
          state: "closed",
          labels: ["enhancement"],
        },
      ];
    }

    try {
      const response = await fetch(
        "https://api.github.com/repos/spring1018/react-ui/issues?state=all&per_page=100",
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
          cache: "no-cache",
        },
      );

      if (!response.ok) {
        throw new Error(
          `GitHub API request failed: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching issues:", error);
      return [];
    }
  }

  const issues = await getIssues();

  return new Response(
    JSON.stringify(
      issues.map((issue) => ({
        title: issue.title,
        url: issue.html_url,
        state: issue.state,
        labels: issue.labels.map((label) => label.name),
      })),
    ),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
