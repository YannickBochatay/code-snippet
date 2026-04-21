# code-snippet
Web component for code snippets based on [highlightjs](https://highlightjs.org/)

## Installation
```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>My code snippet</title>
    <script
      src="https://cdn.jsdelivr.net/npm/code-snippet-wc"
      type="module"
    >
    </script>
  </head>
  <body>
    <code-snippet>Your code here !</code-snippet>
  </body>
</html>
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