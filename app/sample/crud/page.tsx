import Collection from "./collection";
import Form from "./form";

export default async function CrudPage() {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/sample/sheet-table-with-db`;
  const tasks = await fetch(apiUrl, { cache: "no-cache" })
    .then((res) => res.json())
    .then((res) => res.tasks);

  return (
    <div className="grid grid-cols-2">
      <div>
        <Collection tasks={tasks} />
      </div>
      <Form />
    </div>
  );
}
