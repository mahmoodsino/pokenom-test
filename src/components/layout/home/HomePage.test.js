import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from './index';

jest.mock('@/context/auth/CategoriesContext', () => ({
  useCategories: jest.fn(() => ({
    categories: {
      category1: { name: 'Category 1' },
      category2: { name: 'Category 2' },
    },
  })),
}));

describe('HomePage', () => {
  it('renders the homepage with categories', () => {
    render(<HomePage />);
    
    expect(screen.getByText('ALL CATEGORIES')).toBeInTheDocument();

    expect(screen.getByText('Category 1')).toHaveAttribute('href', './category1');
    expect(screen.getByText('Category 2')).toHaveAttribute('href', './category2');
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
  });
});
