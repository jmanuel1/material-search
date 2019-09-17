Material Search
===============

A material design search page prototype. Based on the [Polymer Starter Kit Light
v1](https://github.com/PolymerElements/polymer-starter-kit) and later upgraded
to Polymer 3.

![Demonstration of
material-search](https://cloud.githubusercontent.com/assets/7255867/19464608/9e4247da-94b2-11e6-9a39-7318abb94b7e.gif)

Or see it in action: https://jmanuel1.github.io/material-search/.

Tested in Opera, should work in Chrome.

## Development

### Running locally

#### Prerequisites

- [Git](https://git-scm.com)
- [Yarn](https://yarnpkg.com/)
- [Python 3.7+](https://www.python.org)
- [virtualenv](https://virtualenv.pypa.io/en/latest/)
- [Gulp.js](https://gulpjs.com)
- [Polymer CLI](https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-cli)

#### Set up

Clone the repository.

```bash
> git clone https://github.com/jmanuel1/material-search.git
> cd material-search
```

Create a virtual Python environment under the `env` directory and enter it.

```bash
> virtualenv env
(env) > . env/Scripts/activate  # look up the correct command in virtualenv docs
```

Install the dependencies.

```bash
(env) > yarn
```

Start up a server in the project directory using Polymer CLI and navigate to
`localhost:8081` in a browser.

```bash
(env) > polymer serve
# Go to localhost:8000 in a browser.
```

### Build instructions

To create a development build of the project, run `gulp build`. The build output
will be under the `build/dev` directory.

### Developer guide

#### `index.html`

In the main page, there's a header with tabs and the main content area. The main
content area contains a search bar--in particular, the [`paper-search-bar`
element](http://collaborne.github.io/paper-search/components/paper-search/).
This is hooked up to three fake results that appear in a `div` (id
`search-results`) when something is typed into the search bar by the
`_createItems` method on the app. `_createItems` can be found in
`scripts/app.js`.

#### `elements/elements.js`

This file contains all the imports, including those of elements, used in
`index.html`. This is then loaded as a script module from `index.html`.

#### `styles/app-theme.html`

This has most of material-search's styling. Much of it is from the Polymer
Starter Kit v1, but converted to a module for Polymer 3.

### Tests

Integration tests are under the `test/` directory. Assuming you've already [set
up your development environment](#set-up), you can run the tests using the
following:

#### One-time setup

```bash
> . ./env/Scripts/activate  # `source ./env/bin/activate` in posix
(env) > pip install -r requirements.txt
```

#### When you want to run tests

```bash
# make sure you're in the virtual environment and that there is a development
# build in ./build/dev
(env) > gulp test
```

Test are run on the development build.

#### Writing tests

The tests are written in Python using Selenium and pytest. Please use type
annotations and check the code using mypy.

### Code style

HTML, CSS, and JavaScript files are passed through
[Prettier](https://prettier.io/) whenever they are committed. A Git hook for
this purpose should be set up for you after you run `yarn`.

## Roadmap

1. Optimize site through a build process.

<!-- TODO: Announce this -->
