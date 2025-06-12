export type pagination = {
  current_page: number;
  total_page: number;
  size: number;
};

export type pageData<T> = {
  data: Array<T>;
  paging: pagination;
};
