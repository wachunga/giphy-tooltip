import React, { FunctionComponent, useCallback } from 'react';

import './Tooltip.css';

type TooltipProps = {
  position: DOMRect;
};

const tooltipOffset = 16;

export const Tooltip: FunctionComponent<TooltipProps> = (props) => {
  const { position, children } = props;

  const divElement = useCallback((node) => {
    if (node !== null) {
      // const topOfTooltip = node.getBoundingClientRect().top;
      // TODO: flip tooltip to bottom when topOfTooltip is < 0
    }
  }, []);

  const tooltipTop = position.top - tooltipOffset;
  return children ? (
    <div
      ref={divElement}
      className='giphy-tooltip'
      style={{
        top: tooltipTop,
        left: position.left + position.width / 2,
      }}
      role='tooltip'
      {...props}
    />
  ) : null;
};
