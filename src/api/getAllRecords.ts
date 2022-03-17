import { Record } from "../models/Record";
import { normalizeRecord } from "../utils/normalizeData";

const MAX_ROWS = 10000;

export const getAllRecords = async () => {
  let allRecords: Record[] = [];
  let yearsGroup: Array<any> = [];
  let typesGroup: Array<any> = [];
  let ardtsGroup: Array<any> = [];

  let hits = 0;
  let start = 0;

  do {
    try {
      const results = await fetchData(MAX_ROWS, start);
      allRecords = [
        ...allRecords,
        ...results.records.map((r: any) => normalizeRecord(r)),
      ];
      yearsGroup = getFacetGroup(results.facet_groups, "annee_tournage");
      typesGroup = getFacetGroup(results.facet_groups, "type_tournage");
      ardtsGroup = getFacetGroup(results.facet_groups, "ardt_lieu");

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

  return { allRecords, yearsGroup, ardtsGroup, typesGroup };
};

const fetchData = async (rows: number, start: number) => {
  const res = await fetch(
    `https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=ardt_lieu&rows=${rows}&start=${start}`
  );
  return res.json();
};

const getFacetGroup = (facetGroups: Array<any>, name: string) => {
  const group = facetGroups.filter((fg: any) => fg.name === name);

  if (group.length === 0) {
    return [];
  }

  return group[0].facets;
};
