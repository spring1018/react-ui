import { atom, useAtom } from "jotai";
import { projects } from "./data/projects";
import { Project } from "./type";

type Config = {
  selected: Project["id"] | null;
};

const configAtom = atom<Config>({
  selected: projects[0].id,
});

export function useProject() {
  return useAtom(configAtom);
}
