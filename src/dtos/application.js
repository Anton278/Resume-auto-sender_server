class ApplicationDto {
  jobBoard;
  jobTitle;
  companyName;
  url;
  id;
  status;
  applicationsCount;
  createdAt;
  updatedAt;

  constructor(application) {
    this.jobBoard = application.jobBoard;
    this.jobTitle = application.jobTitle;
    this.companyName = application.companyName;
    this.url = application.url;
    this.id = application._id;
    this.status = application.status;
    this.applicationsCount = application.applicationsCount;
    this.createdAt = application.createdAt;
    this.updatedAt = application.updatedAt;
  }
}

export default ApplicationDto;
