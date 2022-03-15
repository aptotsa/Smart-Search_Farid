import { useEffect, useState } from "react";

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

export default function TableRecords() {
  const {
    state: { visibleRecords: records },
    setRecords,
    nextPage,
  } = useRecords();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      nextPage();
    }
  };

  useEffect(() => {
    const retrieveAll = async () => {
      const allRecords = await getAllRecords();
      setRecords(allRecords);
      setIsLoading(false);
    };

    retrieveAll();
  }, []);

  if (isLoading) {
    <p className="loading">Chargement...</p>;
  }

  // TODO infinite loading
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tournage</TableCell>
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
