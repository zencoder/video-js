var remarkrc = {
  settings: {
    bullet: '*',
    fence: '`',
    listItemIndent: '1',
    incrementListMarker: false
  },
  plugins: {
    'toc': {
      tight: true
    },
  }
};
var args = process.argv;

// only lint in non-output mode
if (args.indexOf('-o') === -1 && args.indexOf('--output') === -1) {
  remarkrc['validate-links'] = {};
  remarkrc.plugins.lint = {
    'blockquote-indentation': ['warn', 2],
    'checkbox-character-style': ['warn'],
    'checkbox-content-indent': ['warn'],
    'code-block-style': ['warn', 'fenced'],
    'definition-case': ['warn'],
    'definition-spacing': ['warn'],
    'emphasis-marker': ['warn'],
    'fenced-code-flag': ['warn'],
    'fenced-code-marker': ['warn', '`'],
    'file-extension': ['warn'],
    'final-definition': ['warn'],
    'final-newline': ['off'],
    'first-heading-level': ['warn', 1],
    'hard-break-spaces': ['off'],
    'heading-increment': ['warn'],
    'heading-style': ['warn', 'atx'],
    'link-title-style': ['warn', '"'],
    'list-item-bullet-indent': ['warn'],
    'list-item-content-indent': ['warn'],
    'list-item-indent': ['warn', 'space'],
    'list-item-spacing': ['off'],
    'maximum-heading-length': ['off'],
    'maximum-line-length': ['off'],
    'no-auto-link-without-protocol': ['warn'],
    'no-blockquote-without-caret': ['warn'],
    'no-consecutive-blank-lines': ['warn'],
    'no-duplicate-definitions': ['warn'],
    'no-duplicate-headings-in-section': ['warn'],
    'no-duplicate-headings': ['off'],
    'no-emphasis-as-heading': ['warn'],
    'no-file-name-articles': ['off'],
    'no-file-name-consecutive-dashes': ['off'],
    'no-file-name-irregular-characters': ['warn', '\\.a-zA-Z0-9-_'],
    'no-file-name-mixed-case': ['warn'],
    'no-file-name-outer-dashes': ['warn'],
    'no-heading-content-indent': ['warn'],
    'no-heading-indent': ['warn'],
    'no-heading-punctuation': ['off'],
    'no-html': ['off'],
    'no-inline-padding': ['warn'],
    'no-literal-urls': ['warn'],
    'no-missing-blank-lines': ['off'],
    'no-multiple-toplevel-headings': ['warn'],
    'no-reference-like-url': ['off'],
    'no-shell-dollars': ['warn'],
    'no-shortcut-reference-iamge': ['off'],
    'no-shortcut-reference-link': ['off'],
    'no-table-indentation': ['warn'],
    'no-tabs': ['warn'],
    'no-undefined-references': ['warn'],
    'no-unused-definitions': ['warn'],
    'ordered-list-marker-style': ['warn', '.'],
    'ordered-list-marker-value': ['warn', 'one'],
    'rule-style': ['warn', '***'],
    'strong-marker': ['warn', 'consistent'],
    'table-cell-padding': ['off'],
    'table-cell-alignment': ['warn'],
    'table-pipes': ['warn'],
    'unordered-list-marker-style': ['warn', 'consistent']
  };
}

module.exports = remarkrc;
