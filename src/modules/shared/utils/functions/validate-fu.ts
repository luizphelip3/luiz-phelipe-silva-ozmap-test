import { statesArray } from "../contraints/uf-array";

export function getUfName(fu: string): string {
  const { name } = statesArray.find((state) => state.fu === fu);

  if (!name) return null;

  return name;
}
