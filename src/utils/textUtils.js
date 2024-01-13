//import { isBlank, zeroWidthCharacters } from 'printable-characters';

export function getTextWithoutBlankCharacters(text) {
  //let strText = String(text).replace(zeroWidthCharacters, "⚠");
  let strText = String(text);

  if (strText.includes('\u0009')) {
    strText = strText.replace(/\u0009/g, "⚠");
  } else if (strText.includes('\u0020')) {
    strText = strText.replace(/\u0020/g, "⚠");
  } else if (strText.includes('\u00A0')) {
    strText = strText.replace(/\u00A0/g, "⚠");
  } else if (strText.includes('\u00AD')) {
    strText = strText.replace(/\u00AD/g, "⚠");
  } else if (strText.includes('\u034F')) {
    strText = strText.replace(/\u034F/g, "⚠");
  } else if (strText.includes('\u061C')) {
    strText = strText.replace(/\u061C/g, "⚠");
  } else if (strText.includes('\u115F')) {
    strText = strText.replace(/\u115F/g, "⚠");
  } else if (strText.includes('\u1160')) {
    strText = strText.replace(/\u1160/g, "⚠");
  } else if (strText.includes('\u17B4')) {
    strText = strText.replace(/\u17B4/g, "⚠");
  } else if (strText.includes('\u17B5')) {
    strText = strText.replace(/\u17B5/g, "⚠");
  } else if (strText.includes('\u180E')) {
    strText = strText.replace(/\u180E/g, "⚠");
  } else if (strText.includes('\u2000')) {
    strText = strText.replace(/\u2000/g, "⚠");
  } else if (strText.includes('\u2001')) {
    strText = strText.replace(/\u2001/g, "⚠");
  } else if (strText.includes('\u2002')) {
    strText = strText.replace(/\u2002/g, "⚠");
  } else if (strText.includes('\u2003')) {
    strText = strText.replace(/\u2003/g, "⚠");
  } else if (strText.includes('\u2004')) {
    strText = strText.replace(/\u2004/g, "⚠");
  } else if (strText.includes('\u2005')) {
    strText = strText.replace(/\u2005/g, "⚠");
  } else if (strText.includes('\u2006')) {
    strText = strText.replace(/\u2006/g, "⚠");
  } else if (strText.includes('\u2007')) {
    strText = strText.replace(/\u2007/g, "⚠");
  } else if (strText.includes('\u2008')) {
    strText = strText.replace(/\u2008/g, "⚠");
  } else if (strText.includes('\u2009')) {
    strText = strText.replace(/\u2009/g, "⚠");
  } else if (strText.includes('\u200A')) {
    strText = strText.replace(/\u200A/g, "⚠");
  } else if (strText.includes('\u200B')) {
    strText = strText.replace(/\u200B/g, "⚠");
  } else if (strText.includes('\u200C')) {
    strText = strText.replace(/\u200C/g, "⚠");
  } else if (strText.includes('\u200D')) {
    strText = strText.replace(/\u200D/g, "⚠");
  } else if (strText.includes('\u200E')) {
    strText = strText.replace(/\u200E/g, "⚠");
  } else if (strText.includes('\u200F')) {
    strText = strText.replace(/\u200F/g, "⚠");
  } else if (strText.includes('\u202F')) {
    strText = strText.replace(/\u202F/g, "⚠");
  } else if (strText.includes('\u205F')) {
    strText = strText.replace(/\u205F/g, "⚠");
  } else if (strText.includes('\u2028')) {
    strText = strText.replace(/\u2028/g, "⚠");
  } else if (strText.includes('\u205F')) {
    strText = strText.replace(/\u205F/g, "⚠");
  } else if (strText.includes('\u2060')) {
    strText = strText.replace(/\u2060/g, "⚠");
  } else if (strText.includes('\u2061')) {
    strText = strText.replace(/\u2061/g, "⚠");
  } else if (strText.includes('\u2062')) {
    strText = strText.replace(/\u2062/g, "⚠");
  } else if (strText.includes('\u2063')) {
    strText = strText.replace(/\u2063/g, "⚠");
  } else if (strText.includes('\u2064')) {
    strText = strText.replace(/\u2064/g, "⚠");
  } else if (strText.includes('\u206A')) {
    strText = strText.replace(/\u206A/g, "⚠");
  } else if (strText.includes('\u206B')) {
    strText = strText.replace(/\u206B/g, "⚠");
  } else if (strText.includes('\u206C')) {
    strText = strText.replace(/\u206C/g, "⚠");
  } else if (strText.includes('\u206D')) {
    strText = strText.replace(/\u206D/g, "⚠");
  } else if (strText.includes('\u206E')) {
    strText = strText.replace(/\u206E/g, "⚠");
  } else if (strText.includes('\u206F')) {
    strText = strText.replace(/\u206F/g, "⚠");
  } else if (strText.includes('\u2800')) {
    strText = strText.replace(/\u2800/g, "⚠");
  } else if (strText.includes('\u3000')) {
    strText = strText.replace(/\u3000/g, "⚠");
  } else if (strText.includes('\u3164')) {
    strText = strText.replace(/\u3164/g, "⚠");
  } else if (strText.includes('\uFEFF')) {
    strText = strText.replace(/\uFEFF/g, "⚠");
  } else if (strText.includes('\uFFA0')) {
    strText = strText.replace(/\uFFA0/g, "⚠");
  } else if (strText.includes('\uFFF9')) {
    strText = strText.replace(/\uFFF9/g, "⚠");
  } else if (strText.includes('\uFFFA')) {
    strText = strText.replace(/\uFFFA/g, "⚠");
  } else if (strText.includes('\u1D159')) {
    strText = strText.replace(/\u1D159/g, "⚠");
  } else if (strText.includes('\u1D173')) {
    strText = strText.replace(/\u1D173/g, "⚠");
  } else if (strText.includes('\u1D174')) {
    strText = strText.replace(/\u1D174/g, "⚠");
  } else if (strText.includes('\u1D175')) {
    strText = strText.replace(/\u1D175/g, "⚠");
  } else if (strText.includes('\u1D176')) {
    strText = strText.replace(/\u1D176/g, "⚠");
  } else if (strText.includes('\u1D177')) {
    strText = strText.replace(/\u1D177/g, "⚠");
  } else if (strText.includes('\u1D178')) {
    strText = strText.replace(/\u1D178/g, "⚠");
  } else if (strText.includes('\u1D179')) {
    strText = strText.replace(/\u1D179/g, "⚠");
  } else if (strText.includes('\u1D17A')) {
    strText = strText.replace(/\u1D17A/g, "⚠");
  }

  return strText;
}

export function hasTextBlankCharacters(text) {
  let strText = String(text);

  /*
  if (isBlank(strText)) {
    return true;
  }
  */

  if (strText.includes('\u0009')) {
    return true;
  } else if (strText.includes('\u0020')) {
    return true;
  } else if (strText.includes('\u00A0')) {
    return true;
  } else if (strText.includes('\u00AD')) {
    return true;
  } else if (strText.includes('\u034F')) {
    return true;
  } else if (strText.includes('\u061C')) {
    return true;
  } else if (strText.includes('\u115F')) {
    return true;
  } else if (strText.includes('\u1160')) {
    return true;
  } else if (strText.includes('\u17B4')) {
    return true;
  } else if (strText.includes('\u17B5')) {
    return true;
  } else if (strText.includes('\u180E')) {
    return true;
  } else if (strText.includes('\u2000')) {
    return true;
  } else if (strText.includes('\u2001')) {
    return true;
  } else if (strText.includes('\u2002')) {
    return true;
  } else if (strText.includes('\u2003')) {
    return true;
  } else if (strText.includes('\u2004')) {
    return true;
  } else if (strText.includes('\u2005')) {
    return true;
  } else if (strText.includes('\u2006')) {
    return true;
  } else if (strText.includes('\u2007')) {
    return true;
  } else if (strText.includes('\u2008')) {
    return true;
  } else if (strText.includes('\u2009')) {
    return true;
  } else if (strText.includes('\u200A')) {
    return true;
  } else if (strText.includes('\u200B')) {
    return true;
  } else if (strText.includes('\u200C')) {
    return true;
  } else if (strText.includes('\u200D')) {
    return true;
  } else if (strText.includes('\u200E')) {
    return true;
  } else if (strText.includes('\u200F')) {
    return true;
  } else if (strText.includes('\u202F')) {
    return true;
  } else if (strText.includes('\u205F')) {
    return true;
  } else if (strText.includes('\u2028')) {
    return true;
  } else if (strText.includes('\u205F')) {
    return true;
  } else if (strText.includes('\u2060')) {
    return true;
  } else if (strText.includes('\u2061')) {
    return true;
  } else if (strText.includes('\u2062')) {
    return true;
  } else if (strText.includes('\u2063')) {
    return true;
  } else if (strText.includes('\u2064')) {
    return true;
  } else if (strText.includes('\u206A')) {
    return true;
  } else if (strText.includes('\u206B')) {
    return true;
  } else if (strText.includes('\u206C')) {
    return true;
  } else if (strText.includes('\u206D')) {
    return true;
  } else if (strText.includes('\u206E')) {
    return true;
  } else if (strText.includes('\u206F')) {
    return true;
  } else if (strText.includes('\u2800')) {
    return true;
  } else if (strText.includes('\u3000')) {
    return true;
  } else if (strText.includes('\u3164')) {
    return true;
  } else if (strText.includes('\uFEFF')) {
    return true;
  } else if (strText.includes('\uFFA0')) {
    return true;
  } else if (strText.includes('\uFFF9')) {
    return true;
  } else if (strText.includes('\uFFFA')) {
    return true;
  } else if (strText.includes('\u1D159')) {
    return true;
  } else if (strText.includes('\u1D173')) {
    return true;
  } else if (strText.includes('\u1D174')) {
    return true;
  } else if (strText.includes('\u1D175')) {
    return true;
  } else if (strText.includes('\u1D176')) {
    return true;
  } else if (strText.includes('\u1D177')) {
    return true;
  } else if (strText.includes('\u1D178')) {
    return true;
  } else if (strText.includes('\u1D179')) {
    return true;
  } else if (strText.includes('\u1D17A')) {
    return true;
  }

  return false;
}
