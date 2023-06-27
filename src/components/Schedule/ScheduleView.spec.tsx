import { render, screen, fireEvent } from '@testing-library/react';
import ScheduleView from './ScheduleView'; // replace with actual path to component
import userClasses from './mockUserClasses';

describe('ScheduleView', () => {
  it('renders without crashing', () => {
    render(<ScheduleView userClasses={userClasses} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('toggles view mode when button is clicked', () => {
    render(<ScheduleView userClasses={userClasses} />);
    const toggleButton = screen.getByText('View All');
    fireEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe('View by Date');
    fireEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe('View All');
  });
});
