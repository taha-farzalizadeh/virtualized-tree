import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { TreeProps, SortType } from './types';
import { TreeNode } from './TreeNode';
import { useTreeData } from './useTreeData';
import { clsx } from 'clsx';

const VirtualizedTree: React.FC<TreeProps> = ({
                                                 data,
                                                 label,
                                                 children = 'children',
                                                 countKey,
                                                 className,
                                                 itemSize = 40,
                                                 height = 400,
                                                 onNodeClick,
                                                 styles,
                                               }) => {
  const { flattenedData, expandedNodes, toggleNode, setSortType, nodeSorts } = useTreeData(
    data,
    label,
    countKey
  );

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const { node, level } = flattenedData[index];

    return (
      <div style={style} className={styles?.row}>
        <TreeNode
          node={node}
          level={level}
          expanded={expandedNodes.has(node.id)}
          labelKey={label}
          countKey={countKey}
          onToggle={() => toggleNode(node.id)}
          onClick={onNodeClick}
          onSort={setSortType}
          currentSort={nodeSorts.get(node.id)}
          styles={styles}
        />
      </div>
    );
  };

  return (
    <div className={clsx('border rounded-lg overflow-hidden', className, styles?.container)}>
      <List
        height={height}
        itemCount={flattenedData.length}
        itemSize={itemSize}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};


export default VirtualizedTree
