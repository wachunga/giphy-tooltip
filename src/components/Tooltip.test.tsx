import React from 'react';
import { render } from '@testing-library/react';
import { Tooltip } from './Tooltip';

const fakePos = { top: 123, left: 123 } as DOMRect;

test('Tooltip shows content and has role', () => {
  const { getByText, getByRole } = render(
    <Tooltip position={fakePos}>tooltip content</Tooltip>
  );
  getByText('tooltip content');
  getByRole('tooltip');
});
