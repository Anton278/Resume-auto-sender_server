import { escapeChars } from "./escapeChars.js";

export const createFailMessage = (vacancy) => {
  const vacancyCopy = { ...vacancy };
  vacancyCopy.jobBoard = escapeChars(vacancyCopy.jobBoard);
  vacancyCopy.jobTitle = escapeChars(vacancyCopy.jobTitle);
  vacancyCopy.companyName = escapeChars(vacancyCopy.companyName);

  return `❌ Failed to send application: required input present\n\nJob board: *${vacancyCopy.jobBoard}*\nJob title: *${vacancyCopy.jobTitle}*\nCompany name: *${vacancyCopy.companyName}*\nUrl: [URL](${vacancyCopy.url})\nApplications count: *${vacancyCopy.applicationsCount}*`;
};

export const createSuccessMessage = (application) => {
  const applicationCopy = { ...application };
  applicationCopy.jobBoard = escapeChars(applicationCopy.jobBoard);
  applicationCopy.jobTitle = escapeChars(applicationCopy.jobTitle);
  applicationCopy.companyName = escapeChars(applicationCopy.companyName);

  return `✅ Successfully sent application\n\nJob board: *${applicationCopy.jobBoard}*\nJob title: *${applicationCopy.jobTitle}*\nCompany name: *${applicationCopy.companyName}*\nUrl: [URL](${applicationCopy.url})\nApplications count: *${applicationCopy.applicationsCount}*`;
};
