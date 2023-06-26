import base from './base';

const { TEXT, BACKGROUND, PRIMARY } = base;

const pink1 = '#EB2371'
const pink2 = '#D72A6E'
const gray = '#958289'
const light3 = '#FFC4D8'

export default {
    colors: {
        text: gray,
        background: gray,
        primary: gray,
    },
    styles: {
      CodeSurfer: {
        pre: {
          color: "text",
          backgroundColor: "background"
        },
        code: {
          color: "text",
          backgroundColor: "background"
        },
        tokens: {
          "comment cdata doctype": {
            fontStyle: "italic"
          },
          "builtin changed keyword punctuation operator tag deleted string attr-value char number inserted": {
            color: "primary"
          },
          "line-number": {
            opacity: 0.8
          }
        },
        title: {
          backgroundColor: "background",
          color: "text"
        },
        subtitle: {
          color: "#d6deeb",
          backgroundColor: "rgba(10,10,10,0.9)"
        },
        unfocused: {
          // only the opacity of unfocused code can be changed
          opacity: 0.1
        }
      }
    }
  };