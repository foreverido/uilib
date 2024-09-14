import { useCallback, useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';

import * as T from './Tabs.types';
import S from './Tabs.styl';

const isId = id => ['string', 'number'].includes(typeof id);

export function Tabs(props: T.Props) {
  const {
    size = 'm',
    className,
    contentClassName,
    items,
    hideTabsIfSingle = false,
    allowEmpty = false,
    onChange,
    renderAll,
    activeId: initialId,
    children,
    ...rest
  } = props;
  const [activeId, setActiveId] = useState(
    isId(initialId) ? initialId : allowEmpty ? null : items[0].id
  );

  useEffect(() => {
    if (isId(initialId)) {
      setActiveId(initialId);
    }
  }, [initialId]);

  const onTabClick = useCallback(
    (e, { id, onClick } = {} as T.Item) => {
      // @ts-ignore
      if (onClick && !onClick(e)) {
        e.peventDefault();
        return;
      }

      const newId = allowEmpty && id === activeId ? null : id;

      setActiveId(newId);
      onChange?.(newId);
    },
    [activeId]
  );

  const tabsContent = [];
  const tabsButtons = items.map((params: T.Item) => {
    const {
      id,
      label,
      forceRender,
      content,
      contentClassName: currContentClassName,
      ...rest
    } = params;
    const isActive = activeId === id;
    const tabContent = typeof content === 'function' ? content() : content;

    if (renderAll || forceRender || isActive) {
      tabsContent.push(
        <div
          className={cn(
            contentClassName,
            currContentClassName,
            !isActive && S.inactive
          )}
          key={id}
        >
          {tabContent}
        </div>
      );
    }

    return (
      <Button
        {...rest}
        size={size}
        key={id}
        onClick={e => onTabClick(e, params)}
        checked={isActive}
      >
        {label}
      </Button>
    );
  });

  const tabs =
    tabsButtons.length === 1 && hideTabsIfSingle ? null : (
      <ButtonGroup className={className} {...rest}>
        {tabsButtons}
      </ButtonGroup>
    );

  if (typeof children === 'function') {
    return children({
      tabs,
      content: tabsContent,
    });
  }

  return (
    <>
      {tabs}
      {children}
      {tabsContent}
    </>
  );
}
