import React, {useRef, useEffect, useState, ReactNode} from 'react';
import { SortAsc, SortDesc, Menu } from 'lucide-react';
import { SortType, TreeStyles } from './types';
import { clsx } from 'clsx';

interface SortMenuProps {
  onSort: (type: SortType) => void;
  currentSort?: SortType;
  styles?: TreeStyles;
}

export const SortMenu: React.FC<SortMenuProps> = ({ onSort, currentSort, styles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultSortIcon = <Menu className="w-4 h-4" />;
  const defaultSortAscIcon = <SortAsc className="w-4 h-4" />;
  const defaultSortDescIcon = <SortDesc className="w-4 h-4" />;

  const sortOptions: { label: string; value: SortType; icon: ReactNode }[] = [
    { label: 'Value (Ascending)', value: 'value-asc', icon: styles?.icons?.sortAsc || defaultSortAscIcon },
    { label: 'Value (Descending)', value: 'value-desc', icon: styles?.icons?.sortDesc || defaultSortDescIcon },
    { label: 'Alphabet (A-Z)', value: 'alphabet-asc', icon: styles?.icons?.sortAsc || defaultSortAscIcon },
    { label: 'Alphabet (Z-A)', value: 'alphabet-desc', icon: styles?.icons?.sortDesc || defaultSortDescIcon },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={clsx('p-1 hover:bg-gray-200 rounded', styles?.sortButton)}
      >
        {styles?.icons?.sort || defaultSortIcon}
      </button>
      {isOpen && (
        <div className={clsx(
          'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50',
          styles?.sortMenu
        )}>
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onSort(option.value);
                  setIsOpen(false);
                }}
                className={clsx(
                  'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2',
                  styles?.sortMenuItem,
                  currentSort === option.value && styles?.sortMenuItemActive
                )}
              >
                {option.icon as ReactNode}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
