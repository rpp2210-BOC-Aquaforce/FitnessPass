import { render, screen, fireEvent } from '@testing-library/react';
import { format, addDays } from 'date-fns';
import userClasses from './mockUserClasses';
import {
  parseLocalDate,
  getScheduledDates,
  getNextScheduledClass,
  WeekDays,
  getWeekTitle,
} from './DateFunctions';

describe('parseLocalDate', () => {
  it('should correctly parse a date string', () => {
    const dateString = '2023-06-30';
    const date = parseLocalDate(dateString);
    expect(date.getFullYear()).toBe(2023);
    expect(date.getMonth()).toBe(5); // Remember, JavaScript counts months from 0
    expect(date.getDate()).toBe(30);
  });
});

describe('getScheduledDates', () => {
  it('should return a set of scheduled dates', () => {
    const scheduledDates = getScheduledDates(userClasses);
    expect(scheduledDates.size).toBe(3);
    expect(scheduledDates.has('2023-06-30')).toBe(true);
    expect(scheduledDates.has('2023-12-01')).toBe(true);
    expect(scheduledDates.has('2023-12-31')).toBe(true);
  });
});

describe('getNextScheduledClass', () => {
  it('should return the date of the next scheduled class', () => {
    const nextClass = getNextScheduledClass(userClasses);
    expect(format(nextClass, 'yyyy-MM-dd')).toBe('2023-12-01');
  });

  it('should return the current date if no future classes are found', () => {
    const pastUserClasses = userClasses.map((userClass) => ({
      ...userClass,
      classes: {
        ...userClass.classes,
        date: '2022-06-30', // set all classes to a past date
      },
    }));
    const nextClass = getNextScheduledClass(pastUserClasses);
    expect(format(nextClass, 'yyyy-MM-dd')).toBe(format(new Date(), 'yyyy-MM-dd'));
  });
});

describe('renderWeekDays', () => {
  it('renders the correct number of days', () => {
    function DummyComponent() {
      const startOfWeekDate = new Date();
      const activeDay = new Date();
      const setActiveDay = jest.fn();
      const scheduledDates = new Set();

      return (
        <WeekDays
          startOfWeekDate={startOfWeekDate}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          scheduledDates={scheduledDates}
        />
      );
    }

    render(<DummyComponent />);

    const days = screen.getAllByRole('button');
    expect(days).toHaveLength(7); // 7 days in a week
  });

  it('calls setActiveDay with the correct date when a day is clicked', () => {
    const setActiveDay = jest.fn();
    const startOfWeekDate = new Date();
    const activeDay = new Date();
    const scheduledDates = new Set();

    function DummyComponent() {
      return (
        <WeekDays
          startOfWeekDate={startOfWeekDate}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          scheduledDates={scheduledDates}
        />
      );
    }

    render(<DummyComponent />);

    const button = screen.getByTestId('day-Tue');
    fireEvent.click(button);

    expect(setActiveDay).toHaveBeenCalledWith(addDays(startOfWeekDate, 2));
  });
});

describe('getWeekTitle', () => {
  it('returns the correct title for the current week', () => {
    expect(getWeekTitle(26)).toBe('This Week');
  });

  it('returns the correct title for a future week', () => {
    expect(getWeekTitle(27)).toBe('In 1 Week');
    expect(getWeekTitle(28)).toBe('In 2 Weeks');
  });

  it('returns the correct title for a past week', () => {
    expect(getWeekTitle(25)).toBe('1 Week Ago');
    expect(getWeekTitle(24)).toBe('2 Weeks Ago');
  });
});
