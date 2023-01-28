import { Global, MantineTheme } from '@mantine/core';

interface IGlobalStyles {}

const GlobalStyles: React.FC<IGlobalStyles> = () => {
  return (
    <Global
      styles={(theme) => ({
        /*
          Uses Josh Comeau's CSS reset: https://www.joshwcomeau.com/css/custom-css-reset/
        */

        /*
          1. Use a more-intuitive box-sizing model.
        */
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        /*
          2. Remove default margin
        */
        '*': {
          margin: 0,
        },

        /*
          3. Allow percentage-based heights in the application
        */
        'html, body': {
          height: '100%',
        },

        /*
          Typographic tweaks!
          4. Add accessible line-height
          5. Improve text rendering
        */
        body: {
          lineHeight: 1.5,
          WebkitFontSmoothing: 'antialiased',
        },

        /*
        6. Improve media defaults
        */
        'img, picture, video, canvas, svg': {
          display: 'block',
          maxWidth: '100%',
        },

        /*
        7. Remove built-in form typography styles
        */
        'input, button, textarea, select': {
          font: 'inherit',
        },

        /*
        8. Avoid text overflows
        */
        'p, h1, h2, h3, h4, h5, h6': {
          overflowWrap: 'break-word',
        },

        /*
        9. Create a root stacking context
        */
        '#root, #__next ': {
          isolation: 'isolate',
        },
      })}
    />
  );
};

export default GlobalStyles;
