/**
 * The Autograph docs: their own docs plugin instance (id "autograph",
 * see docusaurus.config.js), so they can be versioned without freezing
 * Formidable's. Same Prologue → Reference order as Formidable's.
 *
 * Versioned copies live in autograph_versioned_sidebars/; this file is
 * the current (next) version.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const section = (label, items) => ({
  type: 'category',
  label,
  collapsible: false,
  collapsed: false,
  items,
});

const sidebars = {
  autographSidebar: [
    {
      type: 'html',
      defaultStyle: false,
      value:
        '<a class="sidebar-product" href="/docs/autograph"><img src="/img/icons/autograph.svg" alt="" width="34" height="34"><span><strong>Autograph</strong><small>Signatures for ExpressionEngine</small></span></a>',
    },
    section('Prologue', ['index', 'prologue/changelog', 'prologue/upgrade-guide']),
    section('Getting started', [
      'getting-started/installation',
      'getting-started/troubleshooting',
      'getting-started/support',
    ]),
    section('Using Autograph', [
      'using-autograph/field-settings',
      'using-autograph/channel-forms',
      'using-autograph/control-panel',
      'using-autograph/member-fields',
      'using-autograph/grid-and-fluid',
      'using-autograph/storage',
      'using-autograph/displaying-signatures',
    ]),
    section('Reference', ['reference/template-tags', 'reference/markup', 'reference/javascript', 'reference/hooks']),
  ],
};

export default sidebars;
