export function buttonsArray(state) {
  return [
    {
      icon: 'format_align_left',
      value: {textAlign: 'left'},
      active: state['textAlign'] === 'left',
    },
    {
      icon: 'format_align_center',
      value: {textAlign: 'center'},
      active: state['textAlign'] === 'center',
    },
    {
      icon: 'format_align_right',
      value: {textAlign: 'right'},
      active: state['textAlign'] === 'right',
    },
    {
      icon: 'format_bold',
      value: {fontWeight: state['fontWeight'] === 'normal' ? 'bold' : 'normal'},
      active: state['fontWeight'] === 'bold',
    },
    {
      icon: 'format_italic',
      value: {fontStyle: state['fontStyle'] === 'normal' ? 'italic' : 'normal'},
      active: state['fontStyle'] === 'italic',
    },
    {
      icon: 'format_underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'none' ? 'underline' : 'none',
      },
      active: state['textDecoration'] === 'underline',
    },
  ];
}
