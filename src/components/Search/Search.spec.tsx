/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import List from './ListView';
import Map from './MapView';
import ClassSignUp from '../ClassSignUp';

jest.mock('@react-google-maps/api', () => ({
  ...jest.requireActual('@react-google-maps/api'),
  Marker: jest.fn(),
}));

jest.mock('react-geocode', () => ({
  setApiKey: jest.fn(),
  fromAddress: jest.fn().mockResolvedValue({
    results: [
      {
        geometry: {
          location: {
            lat: 37.7749,
            lng: -122.4194,
          },
        },
      },
    ],
  }),
}));

jest.mock('@react-google-maps/api', () => ({
  useLoadScript: jest.fn().mockReturnValue({
    isLoaded: true,
  }),
  GoogleMap: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Marker: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  InfoWindow: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ClassSearch', () => {
  it('triggers search callback on button click', () => {
    // Mock callback function
    const mockSearch = jest.fn();

    // Render the component and get elements
    const { getByRole } = render(<Search user_id={123} onSearch={mockSearch} />);
    const searchButton = getByRole('button', { name: 'GO' });

    // Simulate button click
    fireEvent.click(searchButton);

    // Assert that the search callback was called
    expect(mockSearch).toHaveBeenCalled();
  });

  it('displays a message when search result is empty', async () => {
    // Mock search function that returns an empty array
    const mockSearch = jest.fn().mockResolvedValue([]);

    // Render the component and get elements
    const { getByRole, getByText, getByTestId } = render(
      <Search onSearch={mockSearch} user_id={107} />,
    );
    const inputElement = getByTestId('search-input');

    fireEvent.change(inputElement, { target: { value: 'queens' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    const searchButton = getByRole('button', { name: 'GO' });

    // Simulate button click
    fireEvent.click(searchButton);

    // Wait for the search to complete
    await waitFor(() => expect(mockSearch).toHaveBeenCalled());

    // Assert that the empty result message is displayed
    const emptyMessage = getByText('0 class');
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders a list of items', () => {
    const classes = [
      {
        class_id: 1,
        name: 'Class 1',
        time: '10:00 AM',
        duration: 60,
        num_ratings: 5,
        locations: {
          name: 'Location 1',
          street: 'Street 1',
          city: 'City 1',
          state: 'State 1',
          zip: '12345',
          photo_url: '',
        },
        position: { lat: 37.7891, lng: -122.4023 },
        description: '',
        date: '',
        tags: '',
        instructor: '',
        location_id: 1,
        total_rating: 5,
      },
      {
        class_id: 2,
        name: 'Class 2',
        time: '2:00 PM',
        duration: 90,
        num_ratings: 4,
        locations: {
          name: 'Location 2',
          street: 'Street 2',
          city: 'City 2',
          state: 'State 2',
          zip: '67890',
          photo_url: '',
        },
        position: { lat: 37.7865, lng: -122.4220 },
        description: '',
        date: '',
        tags: '',
        instructor: '',
        location_id: 2,
        total_rating: 5,
      },
    ];

    const { getByText } = render(<List classes={classes} user_id={82} />);
    classes.forEach((Class) => {
      const className = getByText(Class.name);
      expect(className).toBeInTheDocument();
    });
  });

  it('renders markers correctly', async () => {
    (window as any).google = {
      maps: {
        places: {
          Autocomplete: jest.fn(),
        },
        LatLng: jest.fn(),
        Map: jest.fn(),
      },
    };

    const Classes = [
      {
        class_id: 1,
        name: 'Class 1',
        time: '10:00 AM',
        duration: 60,
        num_ratings: 5,
        locations: {
          name: 'Location 1',
          street: 'Street 1',
          city: 'City 1',
          state: 'State 1',
          zip: '12345',
          photo_url: '',
        },
        position: { lat: 37.7891, lng: -122.4023 },
        description: '',
        date: '',
        tags: '',
        instructor: '',
        location_id: 1,
        total_rating: 5,
      },
      {
        class_id: 2,
        name: 'Class 2',
        time: '2:00 PM',
        duration: 90,
        num_ratings: 4,
        locations: {
          name: 'Location 2',
          street: 'Street 2',
          city: 'City 2',
          state: 'State 2',
          zip: '67890',
          photo_url: '',
        },
        position: { lat: 37.7865, lng: -122.4220 },
        description: '',
        date: '',
        tags: '',
        instructor: '',
        location_id: 2,
        total_rating: 5,
      },
    ];

    const center = { lat: 37.7749, lng: -122.4194 };
    render(<Map center={center} classes={Classes} user_id={82} />);
    expect(screen.getByTestId('location')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('markers')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId('myLocation')).toBeInTheDocument();
    });
  });

  it('redirects to login when user is undefined', async () => {
    const user = userEvent.setup();
    const mockedPush = jest.fn();
    const useRouterMock = () => ({
      push: mockedPush,
    });
    (useRouter as jest.Mock).mockReturnValue(useRouterMock());
    render(<ClassSignUp class_id={123} user_id="1" />);
    const signUpButton = screen.getByText('Sign Up');
    await user.click(signUpButton);
    await waitFor(() => {
      expect(mockedPush).toHaveBeenCalledWith('/login');
    }, { timeout: 5000 });
  });

  test('clicking Sign Up button triggers signUp function', async () => {
    const { getByText } = render(<ClassSignUp class_id={123} user_id={107} />);
    const signUpButton = getByText('Sign Up');
    fireEvent.click(signUpButton);
    await waitFor(() => {
      const SignedUp = getByText('Signed Up');
      expect(SignedUp).toBeInTheDocument();
      const cancelButton = getByText('Cancel');
      expect(cancelButton).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
