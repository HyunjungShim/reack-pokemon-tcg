import type { HoverTiltProps } from 'hover-tilt';

/**
 * hover-tilt augments global `JSX` only; with `react-jsx` runtime, tags are checked against
 * the `JSX` namespace re-exported from `react/jsx-runtime`, which extends `React.JSX`.
 * Augmenting the `react` module merges the custom element into that chain.
 */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'hover-tilt': HoverTiltProps & import('react').JSX.IntrinsicElements['div'];
    }
  }
}

export {};
