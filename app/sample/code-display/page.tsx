import CodeDisplay from "@/components/atoms/CodeDisplay";

export default function Page() {
  return (
    <div>
      <CodeDisplay body={`import fs from "fs";`} lang="javascript" />
    </div>
  );
}
