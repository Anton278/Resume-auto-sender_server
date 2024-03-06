class ApplicationDto {
  jobBoard;
  jobTitle;
  companyName;
  url;
  id;
  status;
  createdAt;
  updatedAt;

  constructor(application) {
    this.jobBoard = application.jobBoard;
    this.jobTitle = application.jobTitle;
    this.companyName = application.companyName;
    this.url = application.url;
    this.id = application._id;
    this.status = application.status;
    this.createdAt = application.createdAt;
    this.updatedAt = application.updatedAt;
  }
}

export default ApplicationDto;
