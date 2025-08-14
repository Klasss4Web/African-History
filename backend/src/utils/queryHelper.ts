import { type FilterQuery, type SortOrder } from "mongoose";

interface QueryOptions {
  search?: string;
  field?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

interface QueryResult<T> {
  filter: FilterQuery<T>;
  skip: number;
  limit: number;
  pageNumber: number;
  totalPages: (total: number) => number;
  sort: Record<string, SortOrder>;
}

export function buildQueryParams<T>(
  query: QueryOptions,
  searchableFields: (keyof T)[],
  maxLimit = 100
): QueryResult<T> {
  let filter: FilterQuery<T> = {};

  if (query.search) {
    if (query.search.length > 100) {
      throw new Error("Search term too long");
    }

    const safeSearch = query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (query.field && searchableFields.includes(query.field as keyof T)) {
      // ✅ cast to any to avoid TS error
      (filter as any)[query.field] = { $regex: safeSearch, $options: "i" };
    } else {
      filter.$or = searchableFields.map((field) => ({
        [field]: { $regex: safeSearch, $options: "i" },
      })) as FilterQuery<T>[];
    }
  }

  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), maxLimit);
  const skip = (page - 1) * limit;

  let sort: Record<string, SortOrder> = { createdAt: -1 };
  if (query.sort) {
    sort = {};
    const fields = query.sort.split(",");
    fields.forEach((field) => {
      sort[field.replace("-", "")] = field.startsWith("-") ? -1 : 1;
    });
  }

  const pageNumber = Math.floor(skip / limit) + 1;
  const totalPages = (total: number) => Math.ceil(total / limit);

  return { filter, skip, limit, sort, pageNumber, totalPages };
}
