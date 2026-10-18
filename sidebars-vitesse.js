/**
 * The Vitesse docs: their own docs plugin instance (id "vitesse", see
 * docusaurus.config.js), so they can be versioned on their own later,
 * as Autograph's are. Same Prologue → Reference order as the others.
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
  vitesseSidebar: [
    {
      type: 'html',
      defaultStyle: false,
      value:
        '<a class="sidebar-product" href="/vitesse"><img src="/img/icons/vitesse.svg" alt="" width="34" height="34"><span><strong>Vitesse</strong><small>Vite for ExpressionEngine</small></span></a>',
    },
    section('Prologue', ['index', 'prologue/changelog']),
    section('Getting started', [
      'getting-started/installation',
      'getting-started/setting-up-vite',
      'getting-started/troubleshooting',
      'getting-started/support',
    ]),
    section('Using Vitesse', [
      'using-vitesse/development-and-builds',
      'using-vitesse/stylesheets-and-scripts',
      'using-vitesse/images-and-fonts',
      'using-vitesse/production',
    ]),
    section('Reference', ['reference/template-tags', 'reference/configuration']),
  ],
};

export default sidebars;
