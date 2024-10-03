export interface SearchResult {
  next: string | null;
  prev: string | null;
  resultIds: string[];
  total: number;
}
