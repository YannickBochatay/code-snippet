# code-snippet
Web component for code snippets based on [highlightjs](https://highlightjs.org/)

## Installation
```html
<script
  src="https://cdn.jsdelivr.net/npm/code-snippet-wc"
  type="module"
></script>
```

## Usage
### Basic
```html
<code-snippet>console.log("Hello world");</code-snippet>
```

### Language
You can specify the [language](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md). Default is automatic detection.
```html
<code-snippet language="js">console.log("Hello world");</code-snippet>
```

### Theme
You can specify the [theme](https://github.com/highlightjs/highlight.js/tree/main/src/styles). It will load dynamically.
```html
<code-snippet theme="arta">console.log("Hello world");</code-snippet>
```