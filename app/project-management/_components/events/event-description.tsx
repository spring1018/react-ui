import { Textarea } from "@/components/ui/textarea";
// event を表示
export default function EventDescription({ event }) {
  return <Textarea value={event.description} />;
}
