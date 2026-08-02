import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';

export default function Navbar(props) {
  return (
    <div className="tw-bg-transparent tw-py-2">
      <OriginalNavbar {...props} />
    </div>
  );
}
