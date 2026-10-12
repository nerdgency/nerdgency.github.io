/**
 * Swizzled from @docusaurus/theme-classic (3.x) so the site can register
 * its own ExpressionEngine template grammar alongside the languages named
 * in themeConfig.prism.additionalLanguages. The stock behaviour is kept
 * intact; the only addition is the expressionEngine() call.
 */
import siteConfig from '@generated/docusaurus.config';
import expressionEngine from './prism-expressionengine';

export default function prismIncludeLanguages(PrismObject) {
  const {
    themeConfig: {prism},
  } = siteConfig;
  const {additionalLanguages} = prism;
  const PrismBefore = globalThis.Prism;
  globalThis.Prism = PrismObject;
  additionalLanguages.forEach((lang) => {
    if (lang === 'php') {
      // eslint-disable-next-line global-require
      require('prismjs/components/prism-markup-templating.js');
    }
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`prismjs/components/prism-${lang}`);
  });
  expressionEngine(PrismObject);
  delete globalThis.Prism;
  if (typeof PrismBefore !== 'undefined') {
    globalThis.Prism = PrismObject;
  }
}
