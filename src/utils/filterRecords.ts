import { Record } from "../models/Record";

export const filterRecords = (
  years: string[],
  ardts: string[],
  types: string[],
  allRecords: Record[]
) =>
  allRecords
    .filter((r: Record) => {
      if (years.length === 0) {
        return true;
      }

      return years.includes(r.annee_tournage);
    })
    .filter((r: Record) => {
      if (ardts.length === 0) {
        return true;
      }

      return ardts.includes(r.ardt_lieu);
    })
    .filter((r: Record) => {
      if (types.length === 0) {
        return true;
      }

      let isFound = false;
      r.type_tournage
        .toLowerCase()
        .split(" ")
        .forEach((s: string) => {
          if (types.includes(s)) {
            isFound = true;
          }
        });
      return isFound;
    });
