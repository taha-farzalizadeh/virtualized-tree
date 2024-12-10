export type SortType = 'value-asc' | 'value-desc' | 'alphabet-asc' | 'alphabet-desc';

export interface TreeNode {
  id: string;
  [key: string]: any;
  children?: TreeNode[];
}

export interface TreeStyles {
  container?: string;
  row?: string;
  nodeContainer?: string;
  toggleButton?: string;
  label?: string;
  value?: string;
  sortButton?: string;
  sortMenu?: string;
  sortMenuItem?: string;
  sortMenuItemActive?: string;
  icons?: {
    expanded?: React.ReactNode;
    collapsed?: React.ReactNode;
    sort?: React.ReactNode;
    sortAsc?: React.ReactNode;
    sortDesc?: React.ReactNode;
  };
}

export interface TreeProps {
  data: TreeNode;
  label: string;
  children?: string;
  countKey?: string;
  className?: string;
  itemSize?: number;
  height?: number;
  onNodeClick?: (node: TreeNode) => void;
  styles?: TreeStyles;
}
