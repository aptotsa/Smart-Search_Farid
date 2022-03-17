import { useEffect, useState } from "react";

import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import { ardtFromFilters, yearsFromFilters } from "../utils/dataFromFilters";
import { useRecords } from "../context/RecordsContext";
import { useSearch } from "../context/SearchContext";
import Resume from "./Resume";
import { SearchOutlined } from "@mui/icons-material";

export default function Search() {
  const { filter } = useRecords();

  const {
    state: { options, saved, current },
    setCurrentSearch,
  } = useSearch();

  const [search, setSearch] = useState<Array<string>>(current);

  const filterRecords = (currentSearch: Array<string>) => {
    if (currentSearch.length === 0) {
      filter([], [], []);
      return;
    }
    // current search can be because of saved searches ["2016 2017", "2018", "2019"]
    const newSearch = currentSearch
      .map((s: string) => s.trim().split(" "))
      .reduce((acc, curr) => {
        return [...acc, ...curr];
      }, []);

    const years = yearsFromFilters(newSearch);
    const ardts = ardtFromFilters(newSearch);
    const types = newSearch.reduce((acc: string[], curr: string) => {
      if (years.includes(curr) || ardts.includes(curr)) {
        return acc;
      } else if (parseInt(curr)) {
        return acc;
      }
      acc.push(curr.toLowerCase());
      return acc;
    }, []);

    filter(years, ardts, types);
  };

  useEffect(() => {
    setSearch(current);
    filterRecords(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const onChange = (e: any, values: Array<string>) => {
    setCurrentSearch(values);
  };

  return (
    <div className="header">
      <div className="title">
        <h1>Tournages</h1>
        <Resume />
      </div>
      <div className="search">
        <Box sx={{ boxShadow: 3 }} style={{ borderRadius: 4 }}>
          <Autocomplete
            multiple
            freeSolo
            id="tags-outlined"
            options={[...saved, ...options]}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => {
              params.InputProps.startAdornment = (
                <>
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              );

              return (
                <TextField
                  {...params}
                  placeholder="Recherche par année, arrondissement et type de tournage"
                />
              );
            }}
            onChange={onChange}
            value={search}
          />
        </Box>
      </div>
    </div>
  );
}
