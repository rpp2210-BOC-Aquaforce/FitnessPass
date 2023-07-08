import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import ScheduleView from './ScheduleView';
import { classes } from './mockUserClasses';

xdescribe('ScheduleView', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<ScheduleView fitnessClasses={classes} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  xit('toggles view mode when button is clicked', async () => {
    render(<ScheduleView fitnessClasses={classes} />);
    const toggleButton = screen.getByText('View All');

    act(() => {
      fireEvent.click(toggleButton);
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(toggleButton.textContent).toBe('View by Date');
    }, { timeout: 300 });

    act(() => {
      fireEvent.click(toggleButton);
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(toggleButton.textContent).toBe('View All');
    }, { timeout: 300 });
  });
});
