/**
 * The docs version picker, shown only while reading the docs it versions.
 *
 * Wraps @theme-original's dropdown. A version picker for Autograph means
 * nothing on Formidable's pages, the blog or the homepage, so outside its
 * own plugin's routes it renders nothing.
 */
import React from 'react';
import OriginalDropdown from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';

export default function DocsVersionDropdownNavbarItem(props) {
  const active = useActivePlugin({failfast: false});

  if (active?.pluginId !== (props.docsPluginId ?? 'default')) {
    return null;
  }

  return <OriginalDropdown {...props} />;
}
