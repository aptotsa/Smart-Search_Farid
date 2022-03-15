import React from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { Record } from "../models/Record";
import { OpenInNew } from "@mui/icons-material";

export const Tournage = ({ record }: { record: Record }) => (
  <TableRow
    className="row"
    key={record.id}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell>{record.nom_tournage}</TableCell>
    <TableCell align="right">{record.nom_producteur}</TableCell>
    <TableCell align="right">{record.nom_realisateur}</TableCell>
    <TableCell align="right">{record.ardt_lieu}</TableCell>
    <TableCell align="right">{record.annee_tournage}</TableCell>
    <TableCell align="right">{record.type_tournage}</TableCell>
    <TableCell align="right">
      <a
        href={`https://maps.google.com/?q=${record.coord_y},${record.coord_x}`}
        target="_blank"
        rel="noreferrer"
      >
        <OpenInNew />
      </a>
    </TableCell>
  </TableRow>
);
