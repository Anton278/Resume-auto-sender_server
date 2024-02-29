class UnreachableVacancyDto {
  id;

  constructor(vacancy) {
    this.id = vacancy._id;
  }
}

export default UnreachableVacancyDto;
