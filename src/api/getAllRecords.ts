import { Record } from "../models/Record";
import { normalizeRecord } from "../utils/normalizeData";

const MAX_ROWS = 10000;

export const getAllRecords = async () => {
  let allRecords: Record[] = [];
  let hits = 0;
  let start = 0;

  do {
    try {
      const results = await fetchData(MAX_ROWS, start);
      allRecords = [
        ...allRecords,
        ...results.records.map((r: any) => normalizeRecord(r)),
      ];

      // Requesting only one time
      // Because the API does not allow to retrieve more than 10k records
      hits = 0;
      // hits = results.nhits - allRecords.length;
      // start = allRecords.length + 1;
    } catch (e) {
      hits = 0;
      allRecords = [];
      console.error("Error while retrieving the records", e);
    }
  } while (hits > 0);

  return allRecords;
};

const fetchData = async (rows: number, start: number) => {
  const res = await fetch(
    `https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=ardt_lieu&rows=${rows}&start=${start}`
  );
  return res.json();
};
