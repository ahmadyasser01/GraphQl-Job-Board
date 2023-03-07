import { rejectIfunAuthorized } from "./checker.js";
import { Company, Job } from "./db.js";
export const resolvers = {
  Query: {
    job: (_root, args) => Job.findById(args.id),
    jobs: () => Job.findAll(),
    company: (_root, args) => Company.findById(args.id),
  },
  Mutation: {
    createJob: (_root, { input }, { user }) => {
      rejectIfunAuthorized(!user);
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, { user }) => {
      rejectIfunAuthorized(!user);
      const job = await Job.findById(id);
      rejectIfunAuthorized(job.companyId !== user.companyId);
      return Job.delete(id);
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIfunAuthorized(!user);
      const job = await Job.findById(input.id);
      rejectIfunAuthorized(job.companyId !== user.companyId);
      return Job.update({ ...input, companyId: user.companyId });
    },
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
  Job: {
    // job here is the parent
    company: (job) => Company.findById(job.companyId),
  },
};
