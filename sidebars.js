/**
 * The Formidable docs, in the order a reader meets them -- the way
 * Laravel's docs run from Prologue to Packages. Each top-level category is
 * a section label (styled in braces, base.css) that stays open; only the
 * template tags fold away.
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

const f = (path) => `formidable/${path}`;
const a = (path) => `autograph/${path}`;

const sidebars = {
  formidableSidebar: [
    {
      type: 'html',
      defaultStyle: false,
      value:
        '<a class="sidebar-product" href="/formidable"><img src="/img/icons/formidable.svg" alt="" width="34" height="34"><span><strong>Formidable</strong><small>Forms for ExpressionEngine</small></span></a>',
    },
    section('Prologue', [f('index'), f('prologue/release-notes'), f('prologue/upgrade-guide')]),
    section('Getting started', [
      f('getting-started/installation'),
      f('getting-started/your-first-form'),
      f('getting-started/how-it-works'),
      f('getting-started/troubleshooting'),
      f('getting-started/support'),
    ]),
    section('Building forms', [
      f('building-forms/forms'),
      f('building-forms/fields'),
      f('building-forms/fieldtypes'),
      f('building-forms/validation'),
      f('building-forms/conditions'),
      f('building-forms/multi-page-forms'),
      f('building-forms/repeating-sections'),
      f('building-forms/computed-fields'),
      f('building-forms/settings'),
      f('building-forms/blueprints'),
    ]),
    section('Displaying forms', [
      f('displaying-forms/rendering'),
      f('displaying-forms/themes'),
      f('displaying-forms/regions-and-attributes'),
      f('displaying-forms/capturing-forms'),
      f('displaying-forms/forms-in-entries'),
    ]),
    section('Submissions', [
      f('submissions/managing-submissions'),
      f('submissions/submission-actions'),
      f('submissions/front-end-editing'),
      f('submissions/save-and-resume'),
      f('submissions/spam-and-security'),
    ]),
    section('Automation', [
      f('automation/workflows'),
      f('automation/email-notifications'),
      f('automation/connections'),
      f('automation/workflow-log'),
    ]),
    section('Control panel', [
      f('control-panel/dashboard'),
      f('control-panel/configuration'),
      f('control-panel/registry'),
      f('control-panel/utilities'),
      f('control-panel/permissions'),
    ]),
    section('Headless', [f('headless/headless-forms'), f('headless/json-api'), f('headless/form-json')]),
    section('Reference', [
      {
        type: 'category',
        label: 'Template tags',
        collapsible: false,
        collapsed: false,
        items: [
          f('reference/tags/form'),
          f('reference/tags/submissions'),
          f('reference/tags/drafts'),
          f('reference/tags/capture'),
          f('reference/tags/api-url'),
        ],
      },
      f('reference/configuration'),
      f('reference/command-line'),
    ]),
    section('Extending', [f('extending/hooks'), f('extending/custom-fieldtypes'), f('extending/custom-connections')]),
  ],

  // Autograph is one fieldtype, so its docs are a handful of pages in the
  // same Prologue → Reference order as Formidable's.
  autographSidebar: [
    {
      type: 'html',
      defaultStyle: false,
      value:
        '<a class="sidebar-product" href="/docs/autograph"><img src="/img/icons/autograph.svg" alt="" width="34" height="34"><span><strong>Autograph</strong><small>Signatures for ExpressionEngine</small></span></a>',
    },
    section('Prologue', [a('index'), a('prologue/changelog'), a('prologue/upgrade-guide')]),
    section('Getting started', [
      a('getting-started/installation'),
      a('getting-started/troubleshooting'),
      a('getting-started/support'),
    ]),
    section('Using Autograph', [
      a('using-autograph/field-settings'),
      a('using-autograph/channel-forms'),
      a('using-autograph/control-panel'),
      a('using-autograph/member-fields'),
      a('using-autograph/displaying-signatures'),
    ]),
    section('Reference', [a('reference/template-tags'), a('reference/markup')]),
  ],
};

export default sidebars;
