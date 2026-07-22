/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  formidableSidebar: [
    {
      type: 'category',
      label: 'Formidable',
      link: {
        type: 'doc',
        id: 'formidable/index',
      },
      items: [
        'formidable/installation',
        'formidable/capture-tag',
        'formidable/form-tag',
        'formidable/fields-and-fieldtypes',
        'formidable/conditions',
        'formidable/workflows',
        'formidable/connections',
        'formidable/submissions',
        'formidable/cli',
        'formidable/changelog',
      ],
    },
  ],
};

export default sidebars;
