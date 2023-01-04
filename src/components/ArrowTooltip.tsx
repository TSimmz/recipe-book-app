import { Tooltip } from '@mantine/core';

type TooltipPosition =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'top-start'
  | 'left-start'
  | 'bottom-start'
  | 'right-start'
  | 'top-end'
  | 'left-end'
  | 'bottom-end'
  | 'right-end';

type ArrowTooltipProps = {
  label: string;
  position?: TooltipPosition;
  children: JSX.Element;
};

const ArrowTooltip: React.FC<ArrowTooltipProps> = ({
  label,
  position,
  children,
}: ArrowTooltipProps) => {
  return (
    <Tooltip
      label={label}
      position={position}
      withArrow
      transition="fade"
      transitionDuration={250}
    >
      {children}
    </Tooltip>
  );
};

export default ArrowTooltip;
