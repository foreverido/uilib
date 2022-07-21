import { ButtonProps } from '../Button/Button';

type ID = string | number;

export type Item = ButtonProps & {
  id: ID;
  label: string;
  content: React.ReactNode | (() => React.ReactNode);
  forceRender?: boolean;
  onClick?: (e: MouseEvent) => boolean | void;
};

export type RenderProps = {
  tabs: React.ReactNode;
  content: React.ReactNode;
};

export type Props = {
  className?: string;
  items: Item[];
  activeId?: ID;
  onChange: (id: ID) => void;
  renderAll?: boolean;
  children?: (props: RenderProps) => React.ReactNode;
};
