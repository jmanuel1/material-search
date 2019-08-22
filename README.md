Material Search
---------------

A material design search page prototype. Based on the [Polymer Starter Kit
Light v1](https://github.com/PolymerElements/polymer-starter-kit).

![Demonstration of material-search](https://cloud.githubusercontent.com/assets/7255867/19464608/9e4247da-94b2-11e6-9a39-7318abb94b7e.gif)

Or see it in action: https://jmanuel1.github.io/material-search/

### Running locally

Start up a server in the project directory and navigate to `localhost:<port>`
in a browser. For example:

```bash
$ git clone https://github.com/jmanuel1/material-search.git && cd material-search
$ python3 -m http.server
# Go to localhost:8000 in a browser.
```

Tested in Chrome.

### Developer guide

#### `index.html`

In the main page, there's a header with tabs and the
main content area. The main content area contains a search bar--in particular,
the [`paper-search-bar` element](http://collaborne.github.io/paper-search/components/paper-search/).
This is hooked up to three fake results that appear in a `div` (id
`search-results`) when something is typed into the search bar by the
`_createItems` method on the app. `_createItems` can be found in
`scripts/app.js`.

#### `elements/elements.html`

This file contains all of the HTML imports, including those of elements, used
in `index.html`. This is then imported from `index.html`.

#### `styles/app-theme.html`

This has most of material-search's styling. Most of it is from the Polymer
Starter Kit. Some of the changes/additions are:

```css
/* Hide the app name when the toolbar collapses */
#mainToolbar:not(.tall) #app-name {
  display: none;
}
```

```css
/* paper-search styles */
paper-search-bar {
  /* Mixin from ../node_modules/@bower_components/paper-styles/shadow.html, imported from
  elements.html */
  @apply(--shadow-elevation-3dp);
  border-radius: 2px;
  margin: 5px;
}

paper-card {
  margin: 2.5px auto;
  width: 100%;
}

#search-results {
  margin: 5px;
}
```

### Tests

Integration tests are under the `test/` directory. To run the tests, do:

#### One-time setup

```bash
> python3 -m virtualenv env  # assumes python 3.7+
> . ./env/Scripts/activate  # `source ./env/bin/activate` in posix
(env) > pip install -r requirements.txt
```

#### When you want to run tests

```bash
> . ./env/Scripts/activate  # make sure you're in the virtual environment
(env) > gulp test
```

#### Writing tests

The tests are written in Python using Selenium and pytest. Please use type
annotations and check the code using mypy.

### Code style

HTML, CSS, and JavaScript files are passed through
[Prettier](https://prettier.io/) whenever they are committed. A Git hook for
this purpose should be set up for you after you run `yarn`.

### Roadmap

1. Optimize site through a build process.

<!-- TODO: Announce this -->
