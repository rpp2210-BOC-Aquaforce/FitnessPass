import userClasses from '@/components/Schedule/mockUserClasses';
import { UserClass, Class } from '@/lib/types/';
import { render, screen } from '@testing-library/react';
import ClassCard from './ClassCard';

describe('ClassCard', () => {
  const userClass = userClasses[0];

  it('renders without crashing', () => {
    render(<ClassCard userClass={userClass} />);
    if (userClass.classes.name) {
      expect(screen.getByText(userClass.classes.name)).toBeInTheDocument();
    }
  });

  it('returns null when classes is null', () => {
    const nullishClass: UserClass = {
      ...userClass,
      classes: null as unknown as Class,
    };
    const { container } = render(<ClassCard userClass={nullishClass} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the correct class details', () => {
    render(<ClassCard userClass={userClass} />);
    if (userClass.classes.name) {
      expect(screen.getByText(userClass.classes.name)).toBeInTheDocument();
    }
    expect(screen.getByText(`${userClass.classes.time} (${userClass.classes.duration} min)`)).toBeInTheDocument();
    if (userClass.classes.name) {
      expect(screen.getByText(userClass.classes.name)).toBeInTheDocument();
    }
    expect(screen.getByText(`Ratings: ${userClass.classes.total_rating}`)).toBeInTheDocument();
  });

  it('renders the Edit and Remove buttons', () => {
    render(<ClassCard userClass={userClass} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
});
