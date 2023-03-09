import JobList from "./JobList";
import { useQuery } from "@apollo/client";
import { JOBS_QUERY } from "../graphql/queries-string";

function JobBoard() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  const { jobs } = data;
  if (error) return <>Sorry, Something went Wrong!!</>;
  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
