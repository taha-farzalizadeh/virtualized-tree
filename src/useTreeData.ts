import { useMemo, useState } from 'react';
import { TreeNode, SortType } from './types';

export const useTreeData = (
  data: TreeNode,
  labelKey: string = 'name',
  valueKey: string = 'value'
) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [nodeSorts, setNodeSorts] = useState<Map<string, SortType>>(new Map());

  const sortNodes = (nodes: TreeNode[], sortType?: SortType): TreeNode[] => {
    if (!sortType) return nodes;

    return [...nodes].sort((a, b) => {
      const [type, direction] = sortType.split('-');
      const multiplier = direction === 'desc' ? -1 : 1;

      if (type === 'alphabet') {
        return multiplier * a[labelKey].localeCompare(b[labelKey]);
      }

      return multiplier * ((a[valueKey] || 0) - (b[valueKey] || 0));
    });
  };

  const flattenTree = (
    node: TreeNode,
    level: number = 0,
    result: Array<{ node: TreeNode; level: number }> = []
  ) => {
    result.push({ node, level });

    if (expandedNodes.has(node.id) && node.children) {
      const sortedChildren = sortNodes(node.children, nodeSorts.get(node.id));
      sortedChildren.forEach(child => flattenTree(child, level + 1, result));
    }

    return result;
  };

  const flattenedData = useMemo(
    () => flattenTree(data),
    [data, expandedNodes, nodeSorts]
  );

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const setSortType = (nodeId: string, sortType: SortType) => {
    setNodeSorts(prev => {
      const next = new Map(prev);
      next.set(nodeId, sortType);
      return next;
    });
  };

  return {
    flattenedData,
    expandedNodes,
    toggleNode,
    setSortType,
    nodeSorts,
  };
};
