/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import {
  screen, render, waitFor, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next/navigation';
import Nav from '../src/components/Nav/Nav';
import StudioPage from '../app/studio/[studioID]/page';
import StudioLocationForm from '../app/studio/[studioID]/add-location/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    status: 'authenticated',
    data: {
      user: {
        id: 10,
        name: 'Jest Tester',
        email: 'test@jest.com',
        studio_user: true,
      },
    },
  }),
}));

describe('Studio Page', () => {
  test('Studio Page correctly routes to dynamic ID', async () => {
    render(<Nav />);
    await waitFor(() => {
      const profile = screen.getByText('My Profile');
      expect(profile).toHaveAttribute('href', '/studio/10');
    });
  });

  test('Studio Page should render studio session data on page', async () => {
    render(<StudioPage />);
    const name = screen.getByText('Jest Tester');
    const email = screen.getByText('test@jest.com');
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test('Studio Page correctly routes to each child with dynamic ID pulled from session', async () => {
    render(<StudioPage />);
    await waitFor(() => {
      const addLoc = screen.getByText('Add A Location');
      const addClass = screen.getByText('Add A Class');
      const metrics = screen.getByText('View Metrics');
      const viewClass = screen.getByText('View All Classes');
      const viewLocation = screen.getByText('View All Locations');
      expect(addLoc).toHaveAttribute('href', '/studio/10/add-location');
      expect(addClass).toHaveAttribute('href', '/studio/10/addclass');
      expect(metrics).toHaveAttribute('href', '/studio/10/metrics');
      expect(viewClass).toHaveAttribute('href', '/studio/10/view-classes');
      expect(viewLocation).toHaveAttribute('href', '/studio/10/view-locations');
    });
  });
});

describe('Studio Add Location Form', () => {
  it('renders form', () => {
    render(<StudioLocationForm />);
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<StudioLocationForm />);
    const input = getByLabelText('Studio Name:') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test Studio' } });
    expect(input.value).toBe('Test Studio');
  });

  it('handles form submission', async () => {
    const mockedPush = jest.fn();
    const useRouterMock = () => ({
      push: mockedPush,
    });
    (useRouter as jest.Mock).mockReturnValue(useRouterMock());

    const { getByText, getByLabelText } = render(
      <StudioLocationForm />,
    );
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

    await waitFor(() => {
      fireEvent.click(submitButton);
      expect(mockedPush).toHaveBeenCalledWith('/studio/10');
    });
  });
});
