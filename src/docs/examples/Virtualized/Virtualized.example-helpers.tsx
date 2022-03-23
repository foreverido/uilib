import React from 'react';
// import { path } from 'ramda';
import cn from 'classnames';

import { getRandomImageUrl, getRandomItem } from 'helpers';

import { Icon } from 'components/Icon/Icon';
import { Button } from 'components/Button/Button';
// import Card from 'components/Card/Card';

// import * as TH from '../Table/Table.stories-helpers';
// import { Column } from '../Table/Table.types';

import S from './Virtualized.example.styl';

// const CARD_DATA = {
//   image: [
//     getRandomImageUrl(136, 175),
//     getRandomImageUrl(136, 175),
//     getRandomImageUrl(136, 175),
//     getRandomImageUrl(136, 175),
//     getRandomImageUrl(136, 175),
//   ],
//   title: ['Jacket', 'Shorts', 'Underwear', 'Sweaters', 'Suit', 'Dress', 'Shoe'],
//   description: [
//     'Events 423',
//     'Events 123',
//     'Events 453',
//     'Events 422',
//     'Events 732',
//     'Events 533',
//     'Events 478',
//   ],
// };

export function getSimpleItemData(i) {
  return `Item ${i + 1}`;
}

// export function getTableItemData(i) {
//   return TH.COLUMNS.reduce(
//     (acc, { id }) => ({ ...acc, ...TH.generateColFakeData(id, i) }),
//     {}
//   );
// }

// export function getCardItemData(i) {
//   return {
//     image: getRandomItem(CARD_DATA.image),
//     title: `${i + 1}. ${getRandomItem(CARD_DATA.title)}`,
//     description: getRandomItem(CARD_DATA.description),
//   };
// }

export function renderSimpleItems(props, data) {
  return <div {...props}>{data}</div>;
}

export function renderComplexItem({ className, ...props }, data) {
  return (
    <Button
      className={cn(S.item, className)}
      {...props}
      onClick={() => alert('booo!')}
    >
      <Icon type="arrow-down" /> {data}
    </Button>
  );
}

// export function renderCardItem(props, cardData) {
//   return <Card {...props} {...cardData} key={props.key} />;
// }

// export function renderTableHeader() {
//   return (
//     <tr>
//       {TH.COLUMNS.map(({ id, title }) => (
//         <th key={id}>{title}</th>
//       ))}
//     </tr>
//   );
// }

// export function renderTableCell(data, { id, dataAccessor, render }: Column) {
//   if (render) return render(data);
//   if (dataAccessor) return path(dataAccessor.split('.'), data);
//   return data[id];
// }

// export function renderTableRow(props, data) {
//   return (
//     <tr {...props}>
//       {TH.COLUMNS.map(colParams => (
//         <td key={colParams.id}>{renderTableCell(data, colParams)}</td>
//       ))}
//     </tr>
//   );
// }
