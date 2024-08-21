import { atom, useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Project } from "../../type";

type Config = {
  selected: Project["id"] | null;
};

const configAtom = atom<Config>({
  selected: "",
});

export function useProject() {
  const [project, setProject] = useAtom(configAtom);
  const searchParams = useSearchParams();

  useEffect(() => {
    const init = searchParams.get("projectId") || "";
    setProject({ selected: init });
  }, [searchParams, setProject]);

  return useAtom(configAtom);
}
