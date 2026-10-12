/**
 * The code colours: warm, readable, on the ink panels base.css draws for
 * every block in both colour modes. Amber for the things you type
 * (tags, keywords), sage for strings, a soft violet for variables -- so
 * an ExpressionEngine tag, its parameters and the {variables} inside it
 * read apart at a glance.
 */
const theme = {
  plain: {
    color: '#e9e6dd',
    backgroundColor: '#16181d',
  },
  styles: [
    {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: '#7d7a72', fontStyle: 'italic'}},
    {types: ['punctuation'], style: {color: '#a8a49a'}},
    {types: ['namespace'], style: {opacity: 0.75}},
    {types: ['tag', 'keyword', 'selector', 'important', 'atrule'], style: {color: '#fbbd5c'}},
    {types: ['attr-name', 'property', 'builtin'], style: {color: '#f4a3a0'}},
    {types: ['string', 'attr-value', 'char', 'inserted', 'url'], style: {color: '#b5d38f'}},
    {types: ['variable', 'parameter', 'symbol'], style: {color: '#c9b3f5'}},
    {types: ['function', 'class-name', 'method'], style: {color: '#8fcbe8'}},
    {types: ['number', 'boolean', 'constant'], style: {color: '#f5a76c'}},
    {types: ['operator', 'entity'], style: {color: '#e9e6dd'}},
    {types: ['deleted'], style: {color: '#f28b82'}},
    {types: ['regex'], style: {color: '#e7c27d'}},
    {types: ['bold'], style: {fontWeight: 'bold'}},
    {types: ['italic'], style: {fontStyle: 'italic'}},
  ],
};

module.exports = theme;
