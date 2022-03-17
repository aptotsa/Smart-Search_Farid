import { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Tournage } from "./Tournage";
import { Record } from "../models/Record";
import { getAllRecords } from "../api/getAllRecords";
import { useRecords } from "../context/RecordsContext";
import { useSearch } from "../context/SearchContext";
import SaveSearch from "./SaveSearch";

export default function TableRecords() {
  const {
    state: { visibleRecords: records, total, isLoading },
    setRecords,
    nextPage,
  } = useRecords();

  const { setOptions } = useSearch();

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      nextPage();
    }
  };

  useEffect(() => {
    const retrieveAll = async () => {
      const { allRecords, yearsGroup, ardtsGroup, typesGroup } =
        await getAllRecords();
      setRecords(allRecords, yearsGroup, ardtsGroup, typesGroup);
      setOptions(
        [...yearsGroup, ...ardtsGroup, ...typesGroup].map((el: any) => el.name)
      );
    };
    retrieveAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <p className="loading">Chargement...</p>;
  }

  return (
    <div className="containerTable">
      <div className="total">
        <p className="results">Total: {total}</p>
        <SaveSearch />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="cell">Tournage</TableCell>
              <TableCell align="right">Producteur</TableCell>
              <TableCell align="right">Réalisateur</TableCell>
              <TableCell align="right">Lieu du tournage</TableCell>
              <TableCell align="right">Année</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Carte</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record: Record) => (
              <Tournage key={record.id} record={record} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
