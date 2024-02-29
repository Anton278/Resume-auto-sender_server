class ApplicationDto {
  jobBoard;
  jobTitle;
  companyName;
  url;
  id;

  constructor(application) {
    this.jobBoard = application.jobBoard;
    this.jobTitle = application.jobTitle;
    this.companyName = application.companyName;
    this.url = application.url;
    this.id = application._id;
  }
}

export default ApplicationDto;
