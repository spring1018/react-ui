import { ScrollArea } from "@/components/ui/scroll-area";

export default function EventList({
  events,
  selectedEvent,
  setSelectedProject,
}) {
  return (
    <ScrollArea className="h-full">
      {events.map((event) => (
        <button
          key={event.title}
          className={`flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm w-full transition-all hover:bg-accent max-w-[600px] ${
            event.id === selectedEvent.id ? "bg-blue-200" : ""
          }`}
          onClick={() => setSelectedProject(event)}
        >
          <div className="flex justify-between w-full">
            <h3>{event.title}</h3>
            <p>{event.date}</p>
          </div>
          {/* テキストが長い場合は3行まで表示 */}
          <p className="text-sm text-gray-400 line-clamp-2">
            {event.description}
          </p>
        </button>
      ))}
    </ScrollArea>
  );
}
