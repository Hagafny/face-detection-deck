import base from './base';

const { TEXT, BACKGROUND, PRIMARY } = base;

export default {
  fonts: {
    body: 'Mixtiles Sans',
    p: 'Mixtiles Sans',
    h1: 'Mixtiles Sans SemiBold',
    h2: 'Mixtiles Sans SemiBold',
    h3: 'Mixtiles Sans SemiBold',
    h4: 'Mixtiles Sans SemiBold',
    h5: 'Mixtiles Sans SemiBold',
    h6: 'Mixtiles Sans SemiBold',
  },
  colors: {
    text: TEXT,
    background: BACKGROUND,
    primary: PRIMARY,
  },
  styles: {
    h1: {
      margin: '30px',
    },
    h2: {
      margin: 0,
    },
    CodeSurfer: {
      pre: {
        color: 'text',
        backgroundColor: 'background',
      },
      code: {
        color: 'text',
        backgroundColor: 'background',
        fontSize: '1.5em',
      },
      tokens: {
        'comment cdata doctype': {
          fontStyle: 'italic',
        },
        'builtin changed keyword punctuation operator tag deleted string attr-value char number inserted':
          {
            color: 'primary',
            fontWeight: 600,
          },
        'line-number': {
          opacity: 0.8,
        },
      },
      title: {
        backgroundColor: 'background',
        color: 'text',
      },
      subtitle: {
        backgroundColor: 'background',
        color: 'text',
      },
      unfocused: {
        // only the opacity of unfocused code can be changed
        opacity: 0.1,
      },
    },
  },
};
