import { Project } from "../../type";

interface ProjectDisplayProps {
  item: Project | undefined;
}

export default function ProjectDisplay({ item }: ProjectDisplayProps) {
  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </div>
  );
}
