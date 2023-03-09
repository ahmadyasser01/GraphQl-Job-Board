import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useJob } from "../graphql/hooks";
import { getJob } from "../graphql/queries";

function JobDetail() {
  const { jobId } = useParams();
  const { job, loading } = useJob(jobId);
  if (loading) return <>Loading</>;
  if (job === null) return <>Loading ...</>;

  return (
    <div>
      <h1 className='title'>{job.title}</h1>
      <h2 className='subtitle'>
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className='box'>{job.description}</div>
    </div>
  );
}

export default JobDetail;
