import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectList({
  projects,
  selectedProject,
  setSelectedProject,
}) {
  return (
    <ScrollArea className="h-full">
      {projects.map((project) => (
        <button
          key={project.title}
          className={`flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm w-full transition-all hover:bg-accent ${
            project.id === selectedProject.id ? "bg-blue-200" : ""
          }`}
          onClick={() => setSelectedProject(project)}
        >
          <h3>{project.title}</h3>
          <p className="text-sm text-gray-400">{project.description}</p>
        </button>
      ))}
    </ScrollArea>
  );
}
