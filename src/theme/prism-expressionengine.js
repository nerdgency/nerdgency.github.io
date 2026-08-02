module.exports = function (Prism) {
  Prism.languages.expressionengine = {
	// ---------------------------------------------------------------------
	// Comments
	// ---------------------------------------------------------------------
	
	'comment': {
	  pattern: /\{!--[\s\S]*?--\}/,
	  greedy: true
	},
	
	// ---------------------------------------------------------------------
	// Module Tags
	// ---------------------------------------------------------------------
	
	'module-tag': {
	  pattern: /\{\/?exp:[^}]+\}/,
	  greedy: true,
	  inside: {
		'punctuation': /^\{\/?|\}$/,
		'keyword': /^\/?exp:/,
		'function': /^[^}\s]+/,
		'attribute': /\b[a-zA-Z_][\w:-]*(?==)/,
		'operator': /=/,
		'string': {
		  pattern: /"(?:\\.|[^"])*"/,
		  greedy: true
		}
	  }
	},
	
	// ---------------------------------------------------------------------
	// Conditionals
	// ---------------------------------------------------------------------
	
	'conditional': {
	  pattern: /\{\/?(?:if|if:else|if:elseif)[^}]*\}/,
	  greedy: true,
	  inside: {
		'punctuation': /^\{\/?|\}$/,
		'keyword': /\b(?:if|else|elseif)\b/,
		'operator': /\b(?:AND|OR|NOT|==|!=|<=|>=|<|>)\b|==|!=|<=|>=|<|>/,
		'boolean': /\b(?:TRUE|FALSE|true|false|yes|no)\b/,
		'number': /\b\d+(?:\.\d+)?\b/,
		'string': {
		  pattern: /"(?:\\.|[^"])*"/,
		  greedy: true
		},
		'variable': /\b[a-zA-Z_][\w:.-]*\b/
	  }
	},
	
	// ---------------------------------------------------------------------
	// Variables
	// ---------------------------------------------------------------------
	
	'variable': {
	  pattern: /\{[a-zA-Z_][\w:.-]*\}/,
	  alias: 'symbol'
	},
	
	// ---------------------------------------------------------------------
	// Variable Pairs
	// ---------------------------------------------------------------------
	
	'variable-pair': {
	  pattern: /\{\/?[a-zA-Z_][\w:.-]*\}/,
	  inside: {
		'punctuation': /^\{\/?|\}$/,
		'symbol': /[a-zA-Z_][\w:.-]*/
	  }
	},
	
	// ---------------------------------------------------------------------
	// Embeds
	// ---------------------------------------------------------------------
	
	'embed': {
	  pattern: /\{embed:[^}]+\}/,
	  inside: {
		'punctuation': /^\{|\}$/,
		'keyword': /^embed:/,
		'symbol': /[a-zA-Z0-9_:/.-]+/
	  }
	},
	
	// ---------------------------------------------------------------------
	// Snippets
	// ---------------------------------------------------------------------
	
	'snippet': {
	  pattern: /\{snippet:[^}]+\}/,
	  inside: {
		'punctuation': /^\{|\}$/,
		'keyword': /^snippet:/,
		'symbol': /[a-zA-Z0-9_:/.-]+/
	  }
	}
  };

  Prism.languages.ee = Prism.languages.expressionengine;
  Prism.languages['expression-engine'] =
	Prism.languages.expressionengine;
};