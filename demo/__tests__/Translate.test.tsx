import { render, screen, waitFor } from '@testing-library/react';
import Translate from '../components/Translate';
import preview from '../../dist/index';

describe('Translate', () => {
  it('should render in multiple languages', () => {
    render(<Translate />);
    expect(screen.getByText('English: Hello!')).toBeInTheDocument();
    expect(screen.getByText('Korean: 안녕하세요')).toBeInTheDocument();
    expect(screen.getByText('Japanese: こんにちは')).toBeInTheDocument();
    expect(screen.getByText('Chinese: 你好')).toBeInTheDocument();
    expect(screen.getByText('Thai: สวัสดี')).toBeInTheDocument();
    preview.debug();
  });
});
