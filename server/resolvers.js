import { Company, Job } from "./db.js";
export const resolvers = {
  Query: {
    job: (_root, args) => Job.findById(args.id),
    jobs: () => Job.findAll(),
    company: (_root, args) => Company.findById(args.id),
  },
  Mutation: {
    createJob: (_root, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: (_root, { id }) => Job.delete(id),
    updateJob: (_root, { input }) => Job.update(input),
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
  Job: {
    // job here is the parent
    company: (job) => Company.findById(job.companyId),
  },
};
