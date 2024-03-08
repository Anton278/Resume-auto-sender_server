import { object, string } from "yup";

export const createUnreachableVacancySchema = object({
  jobBoard: string().required(),
  jobTitle: string().required(),
  companyName: string().required(),
  url: string().url().required(),
  reason: string().required(),
  applicationsCount: string(),
});
