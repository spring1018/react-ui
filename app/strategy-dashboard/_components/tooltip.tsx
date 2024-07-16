import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function TooltipDemo({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <BsFillQuestionCircleFill />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-800 text-gray-100">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
