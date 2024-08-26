import { atom, useAtom } from "jotai";

// type Config = {
//   selected: Mail["id"] | null
// }

const configAtom = atom({
  selected: "",
});

export function useTask() {
  return useAtom(configAtom);
}
