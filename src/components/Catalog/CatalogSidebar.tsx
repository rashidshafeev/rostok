import React from 'react';
import { NavLink } from 'react-router-dom';
import { Category } from '../../types/Category/Category';

interface CatalogSidebarProps {
  categoryTree: Category[];
}

const CatalogSidebar: React.FC<CatalogSidebarProps> = ({ categoryTree }) => {
  // ... существующий код ...
};

export default CatalogSidebar; 