# Reveal Bar

`v0.1.0`

A jQuery plugin to hide a top header bar as you scroll down, reveal it as you scroll back up, and fix it to the top of the window when visible. It is heavily inspired by (and even uses code from) [eduardomb](https://github.com/eduardomb)'s [scroll-up-bar](https://github.com/eduardomb/scroll-up-bar).

The biggest differences between this plugin and _scroll-up-bar_ is that it supports a bottom offset, doesn't initiate on iOS (too many issues), and adds a few extra options.

## Basic Usage

Create a top bar/header element that is absolutely positioned, then invoke the plugin on it with:

```
$('#header').revealbar(options);
```

## Options

Reveal Bar uses some of the same options as _scroll-up-bar_, and adds some new ones.

* _Function_ `onDetach`

    Called when the element is detached from the top (its initial state).

* _Function_ `onAttach`

    Called when the element is attached to the top (its initial state).

* _Function_ `onShow`

    Called when the element becomes visible when scrolling.

* _Function_ `onHide`

    Called when the element becomes hidden when scrolling.

* _Number_ `bottomOffset`

    The amount in pixels that the element should be offset on the bottom when scrolling.

## Methods

* `$.revealbar.destroy`

    Resets element to its original position, disables the plugin, and calls `options.onAttach`.
