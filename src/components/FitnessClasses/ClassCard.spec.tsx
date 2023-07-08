import { classes } from '@/components/Schedule/mockUserClasses';
import { Class } from '@/lib/types/';
import { render, screen } from '@testing-library/react';
import ClassCard from './ClassCard';

xdescribe('ClassCard', () => {
  const userClass = classes[0];

  it('renders without crashing', () => {
    render(<ClassCard fitnessClass={userClass} />);
    if (userClass.name) {
      expect(screen.getByText(userClass.name)).toBeInTheDocument();
    }
  });

  it('returns null when classes is null', () => {
    const nullishClass: Class = null as unknown as Class;
    const { container } = render(<ClassCard fitnessClass={nullishClass} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the correct class details', () => {
    render(<ClassCard fitnessClass={userClass} />);
    if (userClass.name) {
      expect(screen.getByText(userClass.name)).toBeInTheDocument();
    }
    expect(screen.getByText(`${userClass.time} (${userClass.duration} min)`)).toBeInTheDocument();
    if (userClass.name) {
      expect(screen.getByText(userClass.name)).toBeInTheDocument();
    }
    expect(screen.getByTestId('star-1')).toBeInTheDocument();
  });

  it('renders the Edit and Remove buttons', () => {
    render(<ClassCard fitnessClass={userClass} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
});
