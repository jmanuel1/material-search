/*
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const styleContainer = document.createElement("template");
styleContainer.innerHTML = `
<style is="custom-style">
  /* Application theme */

  :root {
    --dark-primary-color: #303f9f;
    --default-primary-color: #3f51b5;
    --light-primary-color: #c5cae9;
    --text-primary-color: #ffffff; /*text/icons*/
    --accent-color: #ff4081;
    --primary-background-color: #c5cae9;
    --primary-text-color: #212121;
    --secondary-text-color: #727272;
    --disabled-text-color: #bdbdbd;
    --divider-color: #b6b6b6;

    /* Components */

    /* paper-drawer-panel */
    --drawer-menu-color: #ffffff;
    --drawer-border-color: 1px solid #ccc;
    --drawer-toolbar-border-color: 1px solid rgba(0, 0, 0, 0.22);

    /* paper-menu */
    --paper-menu-background-color: #fff;
    --menu-link-color: #111111;

    /* paper-card */
    --paper-card-background-color: #fff;
  }

  /* paper-tab */

  paper-tab {
    text-transform: uppercase;
  }

  /* General styles */

  paper-material {
    border-radius: 2px;
    height: 100%;
    padding: 16px 0 16px 0;
    width: calc(98.66% - 16px);
    margin: 16px auto;
    background: white;
  }

  /* App header */
  app-header {
    height: calc(64px * 3);
    background: var(--default-primary-color);
    color: var(--text-primary-color);
  }

  /* App toolbar */
  app-toolbar {
    height: calc(64px * 2);
    align-items: flex-end;
  }

  [main-title] {
    margin-bottom: 8px;
  }

  .middle {
    margin-left: 48px;
  }

  /* Paper tabs */
  paper-tabs {
    height: 64px;
  }

  /* The main content area */

  .content-container {
    width: 100%;
  }

  .content {
    height: 900px;
    max-width: 600px;
    margin: 0 auto;
  }

  /* paper-search styles */
  paper-search-bar {
    box-shadow: var(--shadow-elevation-3dp_-_box-shadow);
    border-radius: 2px;
    margin: 5px;
    align-items: center; /* fixes clear button */
    width: calc(100% - 10px);
  }

  paper-card {
    margin: 2.5px auto;
    width: 100%;
  }

  #search-results {
    margin: 5px;
  }

  /* Breakpoints */

  /* Small */
  @media (max-width: 600px) {
    paper-material {
      --menu-container-display: none;
      width: calc(97.33% - 32px);
      padding-left: 16px;
      padding-right: 16px;
    }

    [main-title] {
      font-size: 26px;
      margin-bottom: 4px;
    }

    /* Decrease height of header to 168px */

    app-header {
      height: calc(56px * 3);
    }

    app-toolbar {
      height: calc(56px * 2);
    }

    paper-tabs {
      height: 56px;
    }

    .content {
      min-width: 100%;
    }
  }
</style>
`;
document.head.appendChild(styleContainer.content);