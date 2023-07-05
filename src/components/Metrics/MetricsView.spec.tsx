/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MetricsView from './MetricsView';
import studioPopMetrics from './mockStudioPopMetrics';
import studioEngMetrics from './mockStudioEngMetrics';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Doughnut: () => null,
}));

describe('Studio Metrics View', () => {
  it('Renders the studio metrics view page with expected heading', () => {
    render(<MetricsView studioPopMetrics={studioPopMetrics} studioEngMetrics={studioEngMetrics} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Class Popularity');
  });

  it('Renders the population metrics view on initial page load', () => {
    render(<MetricsView studioPopMetrics={studioPopMetrics} studioEngMetrics={studioEngMetrics} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Class Popularity');
    expect(screen.getByRole('heading', { level: 2 })).not.toHaveTextContent('Class Engagement');
  });

  it('Renders the engagement metrics view when toggled to', async () => {
    const user = userEvent.setup();
    render(<MetricsView studioPopMetrics={studioPopMetrics} studioEngMetrics={studioEngMetrics} />);
    const changePopViewButton = screen.getByTestId('metric_pop_toggle');
    await user.click(changePopViewButton);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Class Engagement');
    expect(screen.getByRole('heading', { level: 2 })).not.toHaveTextContent('Class Popularity');
  });

  it('Toggles back and forth between population and engagement metrics view on button click', async () => {
    const user = userEvent.setup();
    render(<MetricsView studioPopMetrics={studioPopMetrics} studioEngMetrics={studioEngMetrics} />);
    const changePopViewButton = screen.getByTestId('metric_pop_toggle');
    await user.click(changePopViewButton);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Class Engagement');
    expect(screen.getByRole('heading', { level: 2 })).not.toHaveTextContent('Class Popularity');

    const changeEngViewButton = screen.getByTestId('metric_eng_toggle');
    await user.click(changeEngViewButton);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Class Popularity');
    expect(screen.getByRole('heading', { level: 2 })).not.toHaveTextContent('Class Engagement');
  });
});
