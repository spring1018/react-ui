import { codeToHtml } from "shiki";

export default async function CodeDisplay({ body, lang }) {
  const html = await codeToHtml(body, {
    lang,
    theme: "github-dark-dimmed",
  });

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
