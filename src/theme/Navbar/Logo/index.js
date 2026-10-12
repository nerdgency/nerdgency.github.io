/**
 * The navbar brand: the {nerdgency} wordmark set in type, not an image, so
 * it follows the colour mode and stays crisp. Ejected from
 * @docusaurus/theme-classic's Navbar/Logo.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Wordmark from '@site/src/components/Wordmark';

export default function NavbarLogo() {
  return (
    <Link to={useBaseUrl('/')} className="navbar__brand" aria-label="Nerdgency home">
      <Wordmark className="navbar-wordmark" />
    </Link>
  );
}
