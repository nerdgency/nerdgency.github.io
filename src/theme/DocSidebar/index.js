import React from 'react';
import OriginalDocSidebar from '@theme-original/DocSidebar';

export default function DocSidebar(props) {
  return (
    <div className="tw-p-2">
      <OriginalDocSidebar {...props} />
    </div>
  );
}
