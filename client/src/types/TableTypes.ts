export type ColumnData = {
  accessor: string;
  types: string;
  sortable: boolean;
  label: string;
  navigateTo?: (i: number) => void;
};