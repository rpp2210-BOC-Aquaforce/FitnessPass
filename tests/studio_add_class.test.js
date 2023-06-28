/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom/extend-expect';
import AddClass from '../app/studio/[studioID]/addclass/page';

jest.mock('../lib/supabase', () => ({
  from: jest.fn(() => ({
    insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
    select: jest.fn().mockResolvedValue({ data: { location_id: 12, name: 'Expert Fitness', studio_id: 1 }, error: null }),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Studio Add Class', () => {
  // useRouter.mockImplementation(() => ({
  //   useRouter() {
  //     return {
  //       route: '/',
  //       pathname: '',
  //       query: '',
  //       asPath: '/',
  //       push: jest.fn(),
  //     };
  //   },
  // }));
  it('Renders studio add class form', () => {
    // mockRouter.push('/app/studio/1234/addclass/page');
    useRouter.mockReturnValue({ studioID: 1 });
    render(<AddClass />);
    expect(screen.getByText(/add class/i)).toBeInTheDocument();
  });
});

// MSW Node Library - to mock server data
// import {rest} from ‘msw’
// import {setupServer} from ‘msw/node’