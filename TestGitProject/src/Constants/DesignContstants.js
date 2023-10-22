// app constants

import { Dimensions } from 'react-native';

export const colors = {
  primarycolor: '#3579A3',
  secondarycolor: '#F5C39A',
  secondarycolor1: '#EF8732',
  lightcolor: '#4BA5E2',
  extralight: '#8ED3FD',
  backgroundColor:'#FFFFFF',

  textblack: '#000000',
  textgray: '#AAAAAA',
  textwhite: '#FFFFFF',


  lightblack: '#666666',
  billcolor: '#F2FAFF',
  lightblue: '#D3EFFF',
};

export const fontfamily = {
  fontRegular: 'DMSans-Regular',
  fontMedium: 'DMSans-Medium',
  fontItalic: 'DMSans-Italic',
  fontBold: 'DMSans-Bold',
  fontBolditalic: 'DMSans-Bolditalic',
};

export const fontsize = {
  bigheading: 22,
  heading: 18,
  subheading: 16,
  para: 14,
  siddarth: 14,
  paragraph: 12,
  numbers: 10,
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  bold: '600',
};

export const Height = Dimensions.get('window').height;
export const Width = Dimensions.get('window').width;
