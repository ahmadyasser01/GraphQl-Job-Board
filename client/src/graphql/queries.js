import { request } from "graphql-request";
import { gql } from "@apollo/client";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = "http://localhost:9000/graphql";

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        company {
          name
        }
      }
    }
  `;
  const { jobs } = await request(GRAPHQL_URL, query);
  return jobs;
}
export async function getJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const variables = { id };
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
}

export async function getCompany(id) {
  const query = gql`
    query companyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;
  const variables = { id };
  const { company } = await request(GRAPHQL_URL, query, variables);
  console.log(company);
  return company;
}

export async function createJob(input) {
  const query = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const variables = { input };
  const headers = { Authorization: "Bearer " + getAccessToken() };
  console.log(headers);
  const { job } = await request(GRAPHQL_URL, query, variables, headers);
  return job;
}
