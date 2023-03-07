import JobList from "./JobList";
import { jobs } from "../fake-data";
import { useEffect, useState } from "react";
import { getJobs } from "../graphql/queries";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);
  if (error) return <>Sorry, Something went Wrong!!</>;
  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
