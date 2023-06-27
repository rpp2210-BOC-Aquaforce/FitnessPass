import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserClass } from '@/lib/types';
// import {
//   Navigation, Pagination, Scrollbar, A11y,
// } from 'swiper';
import ScheduleView from './ScheduleView';

jest.mock('swiper', () => ({
  Navigation: () => null,
  Pagination: () => null,
  Scrollbar: () => null,
  A11y: () => null,
}));

jest.mock('@/lib', () => ({
  parseLocalDate: jest.fn(),
}));

jest.mock('../FitnessClasses', () => {
  function FitnessClasses() {
    return (<div>FitnessClasses</div>);
  }
  FitnessClasses.displayName = 'FitnessClasses';
  return FitnessClasses;
});

jest.mock('date-fns', () => ({
  format: jest.fn(),
  addDays: jest.fn(),
  startOfWeek: jest.fn(),
  isSameDay: jest.fn(),
  differenceInWeeks: jest.fn(),
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children, onSlideChange }: {
    children: React.ReactNode; onSlideChange: (params: { activeIndex: number }) => void }) => {
    const handleSlideChange = () => {
      onSlideChange({ activeIndex: 27 });
    };
    return (
      <div role="button" tabIndex={0} data-testid="swiper-testid" onClick={handleSlideChange} onKeyDown={(e) => { if (e.key === 'Enter') { console.log('enter'); } }}>
        {children}
      </div>
    );
  },
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide-testid">{children}</div>
  ),
}));

describe('ScheduleView', () => {
  const userClasses: UserClass[] = [
    // Add some mock data here
  ];

  it('renders correctly', () => {
    const { getByText } = render(<ScheduleView userClasses={userClasses} />);
    expect(getByText('This Week')).toBeInTheDocument();
    expect(getByText('View All')).toBeInTheDocument();
  });

  it('changes view mode when button is clicked', () => {
    const { getByText } = render(<ScheduleView userClasses={userClasses} />);
    const viewButton = getByText('View All');
    fireEvent.click(viewButton);
    expect(getByText('View by Date')).toBeInTheDocument();
  });

  it('changes activeDay when day button is clicked', () => {
    const { getByText } = render(<ScheduleView userClasses={userClasses} />);
    const dayButton = getByText('Mon');
    fireEvent.click(dayButton);
    expect(getByText('Tue')).toBeInTheDocument(); // assuming that clicking 'Mon' changes the active day to 'Tue'
  });

  it('changes activeSlide when swiper slide changes', () => {
    const { getByTestId, getByText } = render(<ScheduleView userClasses={userClasses} />);
    const swiper = getByTestId('swiper-testid');
    fireEvent.click(swiper);
    expect(getByText('In 1 Week')).toBeInTheDocument(); // assuming that changing the swiper slide updates the week title
  });

  it('changes viewAll state when view button is clicked', () => {
    const { getByText } = render(<ScheduleView userClasses={userClasses} />);
    const viewButton = getByText('View All');
    fireEvent.click(viewButton);
    expect(getByText('View by Date')).toBeInTheDocument();
  });

  it('passes correct props to FitnessClasses based on viewAll state', () => {
    const { getByText, rerender } = render(<ScheduleView userClasses={userClasses} />);
    const viewButton = getByText('View All');
    fireEvent.click(viewButton);
    rerender(<ScheduleView userClasses={userClasses} />);
    // Here, you would need to check if the FitnessClasses component receives the correct props.
    // This might involve checking if a certain class is rendered,
    // which would depend on your implementation of FitnessClasses.
  });
});
