import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Page() {
  return (
    <ResizablePanelGroup direction="horizontal" className="py-4">
      <ResizablePanel defaultSize={25} minSize={10} className="bg-gray-100">
        <div>Panel 1</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={10} className="bg-gray-200">
        <div>Panel 2</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={30} className="bg-gray-300">
        <div>Panel 3</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
