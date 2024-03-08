class UnreachableVacancyDto {
  id;
  jobBoard;
  jobTitle;
  companyName;
  url;
  reason;
  applicationsCount;
  createdAt;
  updatedAt;

  constructor(vacancy) {
    this.id = vacancy._id;
    this.jobBoard = vacancy.jobBoard;
    this.jobTitle = vacancy.jobTitle;
    this.companyName = vacancy.companyName;
    this.url = vacancy.url;
    this.reason = vacancy.reason;
    this.applicationsCount = vacancy.applicationsCount;
    this.createdAt = vacancy.createdAt;
    this.updatedAt = vacancy.updatedAt;
  }
}

export default UnreachableVacancyDto;
