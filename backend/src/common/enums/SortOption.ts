export enum SortOption {
  Most = 'most',
  Least = 'least',
}

export namespace SortOption {
  export function getSortOrder(option: SortOption): string {
    return option === SortOption.Most ? 'desc' : 'asc';
  }
}
