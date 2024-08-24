const isSingleCharacter = function (text: string) {
  let strGa = 44032; // 가
  let strHih = 55203; // 힣

  var lastStrCode = text.charCodeAt(text.length - 1);

  if (lastStrCode < strGa || lastStrCode > strHih) {
    return false; //한글이 아닐 경우 false 반환
  }
  return (lastStrCode - strGa) % 28 == 0;
};

export const roChecker = function (text: string) {
  // return text + (isSingleCharacter(text) ? '로' : '으로');
  return isSingleCharacter(text) ? '로' : '으로';
};
// '를' 이 붙어야 하는지 '을'이 붙어야 하는지를 체크해주는 함수
export const rulChecker = function (text: string) {
  return text + (isSingleCharacter(text) ? '를' : '을');
};
