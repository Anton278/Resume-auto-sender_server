import { object, string } from "yup";

export const applicationSchema = object({
  jobBoard: string().required(),
  jobTitle: string().required(),
  companyName: string().required(),
  url: string().url().required(),
});
