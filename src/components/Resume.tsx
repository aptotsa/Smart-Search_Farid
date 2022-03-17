import { useState } from "react";
import { useRecords } from "../context/RecordsContext";
import { ChevronRight } from "@mui/icons-material";

export default function Resume() {
  const {
    state: { recordsPerYear, recordsPerType },
  } = useRecords();

  const resumes = [recordsPerType, recordsPerYear];
  const [selectedResume, setSelectedResume] = useState<number>(0);

  if (recordsPerType?.length === 0) {
    return <div />;
  }

  return (
    <>
      <div className="horizontal">
        {resumes[selectedResume]?.map((record: any) => (
          <div key={record.name} className="resume">
            <h3 className="resume-title">{record.name}</h3>
            <p className="resume-count">{record.count}</p>
          </div>
        ))}
      </div>
      <div
        className="next"
        onClick={() => setSelectedResume((curr) => (curr + 1) % 2)}
      >
        <ChevronRight />
      </div>
    </>
  );
}
