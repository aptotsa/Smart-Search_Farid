import { useEffect, useState, useRef } from "react";

import { TextField } from "@mui/material";
import { ardtFromFilters, yearsFromFilters } from "../utils/dataFromFilters";
import { useRecords } from "../context/RecordsContext";

export default function Search() {
  const {
    state: { total },
    filter,
  } = useRecords();

  let timeout: any = useRef(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search === "") {
      filter([], [], []);
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      const searchArr = search.split(" ");
      const years = yearsFromFilters(searchArr);
      const ardts = ardtFromFilters(searchArr);
      const types = searchArr.reduce((acc: string[], curr: string) => {
        if (years.includes(curr) || ardts.includes(curr)) {
          return acc;
        } else if (parseInt(curr)) {
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);

      filter(years, ardts, types);
    }, 500);
  }, [search]);

  return (
    <div className="header">
      <TextField
        id="outlined-basic"
        label="Recherche"
        variant="outlined"
        onChange={(e: any) => setSearch(e.target.value.trim().toLowerCase())}
        className="search"
      />
      <p className="results">Résultats: {total}</p>
    </div>
  );
}
