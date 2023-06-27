/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudioLocationForm from '../app/studio/[studioID]/add-location/page';

jest.mock('../lib/supabase', () => ({
  from: jest.fn(() => ({
    insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
  })),
}));

describe('Studio Add Location', () => {
  it('renders form', () => {
    render(<StudioLocationForm />);
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<StudioLocationForm />);
    const input = getByLabelText('Studio Name:');
    fireEvent.change(input, { target: { value: 'Test Studio' } });
    expect(input.value).toBe('Test Studio');
  });

  it('handles form submission', () => {
    const { getByText, getByLabelText } = render(<StudioLocationForm />);
    const submitButton = getByText('Submit');

    fireEvent.change(getByLabelText('Studio Name:'), {
      target: { value: 'Test Studio' },
    });

    fireEvent.change(getByLabelText('Street:'), {
      target: { value: 'Test Street' },
    });

    fireEvent.change(getByLabelText('City:'), {
      target: { value: 'Test City' },
    });

    fireEvent.change(getByLabelText('State:'), {
      target: { value: 'Test State' },
    });

    fireEvent.change(getByLabelText('Zip Code:'), {
      target: { value: '12345' },
    });

    fireEvent.change(getByLabelText('Phone Number:'), {
      target: { value: '1234567890' },
    });

    fireEvent.click(submitButton);
  });
});
