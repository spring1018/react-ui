import { ViewMode } from "gantt-task-react";
import { atom, useAtom } from "jotai";

type Config = {
  selected: string | null;
};

const configAtom = atom<Config>({
  selected: ViewMode.Month,
});

export function useViewMode() {
  return useAtom(configAtom);
}
