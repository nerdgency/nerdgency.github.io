import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';

export default function DocItem(props) {
  return (
    <div className="tw-prose tw-max-w-none">
      <OriginalDocItem {...props} />
    </div>
  );
}
