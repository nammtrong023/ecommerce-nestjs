import { FilterProductsAndPagination } from 'types';

export const parseProductsFilters = (filters: FilterProductsAndPagination) => {
  const itemsPerPage = Number(filters.itemsPerPage) || 10;
  const page = Number(filters.page) || 1;

  const search = filters.search || '';
  const skip = page > 1 ? (page - 1) * itemsPerPage : 0;
  const status = parseInt(filters.status);
  const sort = filters.sort;

  return { itemsPerPage, page, search, skip, status, sort, ...filters };
};
