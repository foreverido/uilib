import { RefObject, ReactChild, ReactNode } from 'react';
import { Size } from 'components/Input/Input.types';
import { InputProps } from 'components/Input/Input';
import { PopupProps } from 'components/Popup/Popup';

export type Id = string | number;

export type Option = {
  id: Id;
  isGroupHeader?: boolean;
  parentId?: Id;
  label: any;
  sortingKey: string | number;
  children?: Option[];
  render?: (label: string) => string;
};

type Preset = {
  label: string;
  ids: Id[];
};

export type PresetButtonProps = {
  key: string;
  children: ReactChild;
  onClick: () => void;
};

type SelectPopupProps = Omit<
  PopupProps,
  | 'disabled'
  | 'direction'
  | 'autoClose'
  | 'onOpen'
  | 'onClose'
  | 'trigger'
  | 'content'
> &
  Partial<{ direction: PopupProps['direction'] }>;

type Selected = { [id: string]: true | Id[] };

export type Props = {
  className?: string;
  isOpen?: boolean;
  optionsClassName?: string;
  optionClassName?: string;
  name?: string;
  label?: string;
  additionalLabel?: ReactNode;
  size?: Size;
  options: Option[];
  limit?: number;
  selectTree?: any; // typeof OptionsTree
  isOnlyLeafs?: boolean; // select only leafs
  additionalOptions?: Option[];
  presets?: Preset[];
  clearButton?: boolean;
  selectAllButton?: boolean;
  sortBy?: string;
  groupBy?: string;
  value?: Id | Id[] | null;
  onApi?: (optionsTree: any) => void;
  getInputVal?: (params: {
    isFocused: boolean;
    searchVal: string;
    selected: Selected;
  }) => string;
  expandSelected?: boolean;
  onChange: (value: Id | Id[]) => void;
  onFocus?: InputProps['onFocus'];
  onBlur?: InputProps['onBlur'];
  onOpen?: () => void;
  onClose?: () => void;
  isSearchable?: boolean;
  inputProps?: Omit<
    InputProps,
    'value' | 'onChange' | 'onFocus' | 'onBlur' | 'size'
  >;
  disableTrigger?: boolean;
  disableTriggerArrow?: boolean;
  triggerProps?: any;
  popupProps?: SelectPopupProps;
  hideRequiredStar?: boolean;
  hideErrorMessage?: boolean;
  independentSelection?: boolean;
  groupSelectedLeafs?: boolean;
} & Partial<Pick<InputProps, 'required' | 'error' | 'disabled'>>;

export type State = {
  isFocused: boolean;
  isOpen: boolean;
  isSelectionLimited: boolean;
  selected: Selected;
  expanded: { [id: string]: boolean };
  searchVal: string;
  options: Option[];
  labelClipPath: string;
  optionsTreeUpd: number; // store in state to receive updates
};

export type OptionElemProps = {
  className: string;
  key: Option['id'];
  onMouseDown: () => void;
  onMouseUp: () => void;
  ref?: RefObject<HTMLDivElement>;
};
