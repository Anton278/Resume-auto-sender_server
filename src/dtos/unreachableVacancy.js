class UnreachableVacancyDto {
  id;
  jobBoard;
  jobTitle;
  companyName;
  url;
  reason;

  constructor(vacancy) {
    this.id = vacancy._id;
    this.jobBoard = vacancy.jobBoard;
    this.jobTitle = vacancy.jobTitle;
    this.companyName = vacancy.companyName;
    this.url = vacancy.url;
    this.reason = vacancy.reason;
  }
}

export default UnreachableVacancyDto;
