import { object, string } from "yup";

export const createApplicationSchema = object({
  jobBoard: string().required(),
  jobTitle: string().required(),
  companyName: string().required(),
  url: string().url().required(),
  status: string().required(),
});

export const updateApplicationSchema = object({
  jobBoard: string(),
  jobTitle: string(),
  companyName: string(),
  url: string().url().required(),
  status: string(),
});
