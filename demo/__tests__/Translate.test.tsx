import { render, screen } from '@testing-library/react';
import Translate from '../components/Translate';
import preview from '../../dist/index';

describe('Translate', () => {
  it('render hello in English', () => {
    render(<Translate />);
    expect(screen.getByText('English: Hello!')).toBeInTheDocument();
  });

  it('render hello in Korean', () => {
    render(<Translate />);
    expect(screen.getByText('Korean: 안녕하세요')).toBeInTheDocument();
    preview.debug();
  });

  it('render hello in Japanese', () => {
    render(<Translate />);
    expect(screen.getByText('Japanese: こんにちは')).toBeInTheDocument();
    preview.debug();
  });

  it('render hello in Chinese', () => {
    render(<Translate />);
    expect(screen.getByText('Chinese: 你好')).toBeInTheDocument();
    preview.debug();
  });

  it('render hello in Thai', () => {
    render(<Translate />);
    expect(screen.getByText('Thai: สวัสดี')).toBeInTheDocument();
    preview.debug();
  });
});
