/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import AddClassForm from './AddClassForm';
import studioLocations from './mockStudioLocations';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Add Class Form', () => {
  it('Renders the studio add class form with expected heading', () => {
    render(<AddClassForm studioLocs={studioLocations} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Add Class');
  });

  it('Renders all expected form input labels', () => {
    render(<AddClassForm studioLocs={studioLocations} />);
    expect(screen.getByTestId('location_label')).toHaveTextContent('Location:');
    expect(screen.getByLabelText('Class Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Class Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Instructor:')).toBeInTheDocument();
    expect(screen.getByLabelText('Class Date:')).toBeInTheDocument();
    expect(screen.getByLabelText('Class Start Time:')).toBeInTheDocument();
    expect(screen.getByLabelText('Class Duration:')).toBeInTheDocument();
    expect(screen.getByLabelText('Tags:')).toBeInTheDocument();
  });

  it('Renders submit and cancel buttons', () => {
    render(<AddClassForm studioLocs={studioLocations} />);
    expect(screen.getByTestId('add_class_submit')).toHaveTextContent('Add Class');
    expect(screen.getByTestId('add_class_cancel')).toHaveTextContent('Cancel');
  });

  it('Renders studio locations for selector', async () => {
    const user = userEvent.setup();
    render(<AddClassForm studioLocs={studioLocations} />);
    expect((screen.getByRole('option', { name: 'Please Select Location' }) as HTMLOptionElement).selected).toBe(true);
    expect(screen.getAllByRole('option').length).toBe(4);
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Complex Gym' }),
    );
    expect((screen.getByRole('option', { name: 'Complex Gym' }) as HTMLOptionElement).selected).toBe(true);
  });

  it('Captures user input for text form inputs', async () => {
    const user = userEvent.setup();
    render(<AddClassForm studioLocs={studioLocations} />);

    const titleInput = screen.getByTestId('class_name_input');
    expect(titleInput).toBeInTheDocument();
    await user.type(titleInput, 'Aqua Zumba');
    expect(screen.getByTestId('class_name_input')).toHaveValue('Aqua Zumba');

    const descriptionInput = screen.getByTestId('class_description_input');
    expect(descriptionInput).toBeInTheDocument();
    await user.type(descriptionInput, 'An aquatic fitness spectacular');
    expect(screen.getByTestId('class_description_input')).toHaveValue('An aquatic fitness spectacular');

    const instructorInput = screen.getByTestId('class_instructor_input');
    expect(instructorInput).toBeInTheDocument();
    await user.type(instructorInput, 'Dee Reynolds');
    expect(screen.getByTestId('class_instructor_input')).toHaveValue('Dee Reynolds');
  });

  // it('Sends class data on form submit', async () => {
  //   // To be written...
  // });

  it('Redirects to the studio profile page on form cancel', async () => {
    const user = userEvent.setup();
    const mockedPush = jest.fn();
    const useRouterMock = () => ({
      push: mockedPush,
    });
    (useRouter as jest.Mock).mockReturnValue(useRouterMock());
    render(<AddClassForm studioLocs={studioLocations} />);
    const cancelButton = screen.getByTestId('add_class_cancel');
    await user.click(cancelButton);
    expect(mockedPush).toHaveBeenCalledWith('/studio/1234'); // Will need to be refactored once auth is merged, this is a hard-coded studioID ***
  });
});
