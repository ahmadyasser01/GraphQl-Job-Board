import { Company, Job } from "./db.js";
export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
  },
  Job: {
    // job here is the parent
    company: (job) => Company.findById(job.companyId),
  },
};
