module.exports = function tailwindPlugin(context, options) {
  return {
	name: "tailwind-plugin",
	configurePostCss(postcssOptions) {
	  // Use push to keep existing Docusaurus PostCSS plugins intact
	  postcssOptions.plugins.push(require("@tailwindcss/postcss"));
	  return postcssOptions;
	},
  };
};
