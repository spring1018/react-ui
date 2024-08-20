"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

const items = [
  { name: "Item 1" },
  { name: "Item 2" },
  { name: "Item 3" },
  { name: "Item 4" },
  { name: "Item 5" },
  { name: "Item 6" },
  { name: "Item 7" },
  { name: "Item 8" },
  { name: "Item 9" },
  { name: "Item 10" },
  { name: "Item 11" },
  { name: "Item 12" },
  { name: "Item 13" },
  { name: "Item 14" },
  { name: "Item 15" },
  { name: "Item 16" },
  { name: "Item 17" },
  { name: "Item 18" },
  { name: "Item 19" },
  { name: "Item 20" },
];

export default function Page() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={10} minSize={10} className="bg-slate-100">
        <div>
          <div>Sidebar</div>
          <ScrollArea className="h-[90vh]">
            <div>
              {items.map((item) => (
                <div className="border h-20 mx-2" key={item.name}>
                  {item.name}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={10}>
        <div>Panel 2</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={30}>
        <div>Panel 3</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
