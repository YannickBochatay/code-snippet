const HIGHLIGHT_BASE_URL = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1";

const themes = {};

Object.defineProperties(themes, {
  add : {
    async value(theme) {
      const style =  new CSSStyleSheet();
      themes[theme] = style;

      const res = await fetch(`${HIGHLIGHT_BASE_URL}/styles/${theme}.min.css`)
      style.replace(await res.text());
    }
  }
});

const languages = {};

Object.defineProperties(languages, {
  add : {
    async value(theme) {
      const style =  new CSSStyleSheet();
      themes[theme] = style;

      const res = await fetch(`${HIGHLIGHT_BASE_URL}/styles/${theme}.min.css`)
      style.replace(await res.text());
    }
  }
});

const style = new CSSStyleSheet()

style.replaceSync(/*css*/`
  :host {
    display:block;
    position:relative;

    & > div {
      overflow-x:auto;

      pre {
        margin:0;

        code.hljs {
          box-sizing:border-box;
          min-width:100%;
          width:fit-content;
        }
      }

      button {
        position:absolute;
        top:0;
        right:0;
        border:none;
        display:none;

        svg {
          stroke-width:2;
          stroke:#555;
          fill:none;
          stroke-linecap:round;
          stroke-linejoin:round;
        }
      }

      &:hover button {
        display:inline-block;
      }
    }
  }
`);

const template = document.createElement("template");

template.innerHTML = `
  <div tabindex="0" role="region" aria-label="Code snippet">
    <pre><code></code></pre>
    <button title="" aria-label="">
      <svg width="24" height="24">
        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
      </svg>
    </button>
  </div>
  <slot></slot>
`

class CodeSnippet extends HTMLElement {

  static observedAttributes = ["language", "theme", "copy-label"];

  constructor() {
    super();
    const root = this.attachShadow({ mode : "open" });
    root.append(template.content.cloneNode(true));
    root.adoptedStyleSheets = [style]
  }

  get language() {
    return this.getAttribute("language");
  }

  set language(value) {
    this.setAttribute("language", value)
  }

  get theme() {
    return this.getAttribute("theme");
  }

  set theme(value) {
    this.setAttribute("theme", value)
  }

  get copyLabel() {
    return this.getAttribute("copy-label");
  }

  set copyLabel(value) {
    this.setAttribute("copy-label", value)
  }

  copyCode = async () => {
    const { textContent } = this.shadowRoot.querySelector("code");
    const btn = this.shadowRoot.querySelector("button");
    
    try {
      await navigator.clipboard.writeText(textContent);

      const icon = btn.firstElementChild;
      const label = this.label;

      btn.textContent = 'Copied !';
      btn.setAttribute('aria-label', 'Code copied');
      
      setTimeout(() => {
          btn.replaceChildren(icon);
          btn.setAttribute('aria-label', label);
      }, 2000);

    } catch (e) {
      alert('Unable to copy code. Please copy it manually.');
    }
  }

  async connectedCallback() {
    const { default : hljs } = await import(`${HIGHLIGHT_BASE_URL}/es/highlight.min.js`);
    const code = this.shadowRoot.querySelector("code");
    const slot = this.shadowRoot.querySelector("slot");    
    code.append(...slot.assignedNodes());
    slot.remove();

    hljs.highlightElement(code);

    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", this.copyCode);
    
    const container = this.shadowRoot.querySelector("[tabindex='0']");
    container.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') this.copyCode();
    })

    if (!this.hasAttribute("theme")) this.theme = "default";
  }

  attributeChangedCallback(prop, prevValue, value) {

    if (prop === "language") {
      const code = this.shadowRoot.querySelector("code");
      code.className = code.className = "language-" + this.language;

    } else if (prop === "theme") {
      if (!(value in themes)) themes.add(value);
      this.shadowRoot.adoptedStyleSheets[1] = themes[value];

    } else if (prop === "copy-label") {
      const btn = this.shadowRoot.querySelector("button");
      btn.setAttribute('aria-label', label);
    }
  }
}

customElements.define("code-snippet", CodeSnippet);