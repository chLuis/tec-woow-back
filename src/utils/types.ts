export interface PaginatedResult {
  data: any[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export interface DashboardResult {
  data: any[];
  meta: {
    total: number
  };
}