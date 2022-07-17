import Filter from "./Filter";

export default interface MoviesFilter {
  filters?: Filter | null;
  page?: number;
  moviesPerPage?: number;
}
