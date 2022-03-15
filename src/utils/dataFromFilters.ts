export const yearsFromFilters = (filters: string[]) =>
  filters.filter((s: string) => s.length === 4 && parseInt(s));

export const ardtFromFilters = (filters: string[]) =>
  filters.filter((s: string) => s.length === 5 && parseInt(s));
