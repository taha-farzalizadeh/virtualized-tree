import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { TreeNode as TreeNodeType, SortType, TreeStyles } from './types';
import { SortMenu } from './SortMenu';
import { clsx } from 'clsx';

interface TreeNodeProps {
  node: TreeNodeType;
  level: number;
  expanded: boolean;
  labelKey: string;
  countKey?: string;
  onToggle: () => void;
  onClick?: (node: TreeNodeType) => void;
  onSort?: (nodeId: string, sortType: SortType) => void;
  currentSort?: SortType;
  styles?: TreeStyles;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
                                                    node,
                                                    level,
                                                    expanded,
                                                    labelKey,
                                                    countKey,
                                                    onToggle,
                                                    onClick,
                                                    onSort,
                                                    currentSort,
                                                    styles,
                                                  }) => {
  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = level * 20;

  const defaultExpandedIcon = <ChevronDown className="w-4 h-4" />;
  const defaultCollapsedIcon = <ChevronRight className="w-4 h-4" />;

  return (
    <div
      className={clsx(
        'flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200',
        styles?.nodeContainer
      )}
      style={{ paddingLeft: `${paddingLeft}px` }}
      onClick={() => onClick?.(node)}
    >
      <div className="flex items-center gap-2">
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={clsx('p-1 hover:bg-gray-200 rounded', styles?.toggleButton)}
          >
            {expanded
              ? styles?.icons?.expanded || defaultExpandedIcon
              : styles?.icons?.collapsed || defaultCollapsedIcon}
          </button>
        )}
      </div>
      <span className={clsx('flex-1', styles?.label)}>{node[labelKey]}</span>
      <div className="flex items-center gap-2">
        {countKey && (
          <span className={clsx('text-gray-500 text-sm', styles?.value)}>
            {node[countKey]}
          </span>
        )}
        {hasChildren && onSort && (
          <SortMenu
            onSort={(sortType) => onSort(node.id, sortType)}
            currentSort={currentSort}
            styles={styles}
          />
        )}
      </div>
    </div>
  );
};
