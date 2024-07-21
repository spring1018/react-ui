import { atom, useAtom } from "jotai";
import { Project } from "./type";

const projects = [
  {
    id: "1",
    title: "Project 1",
  },
  {
    id: "2",
    title: "Project 2",
  },
  {
    id: "3",
    title: "Project 3",
  },
];

type Config = {
  selected: Project["id"] | null;
};

const configAtom = atom<Config>({
  selected: projects[0].id,
});

export function useProject() {
  return useAtom(configAtom);
}
