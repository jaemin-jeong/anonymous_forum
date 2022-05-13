import db from '../models/index.cjs';

export const postRegistAlert = async (registContent, idx) => {
  // 키워드 테이블에서 데이터 추출
  const keywordList = await db['tb_keyword'].findAll({
    attributes: ['keyword', 'receiver']
  });

  if (!keywordList.length) {
    console.log('저장된 키워드 없음');
    return;
  }

  let keywordGroup = keywordList.reduce((prev, curr) => {
    if(!prev[curr['keyword']]) {
      prev[curr['keyword']] = [];
    }
    prev[curr['keyword']].push(curr['receiver']);

    return prev
  }, {});

  let receiverList = [];

  Object.keys(keywordGroup).map(keyword => {
    if (registContent.indexOf(keyword) === -1) {
      return null;
    };

    receiverList = [...keywordGroup[keyword]];
    return null;
  });

  if (!receiverList.length) {
    console.log('키워드 알림 미발송');
    return;
  }

  let receiverSet = new Set(receiverList);
  receiverList = [...receiverSet];

  // 알림에 키워드가 포함된 게시물 링크도 제공
  // const postUrl = `https://www.test.com/comunity/post/${idx}`
  receiverList.map(receiver => {
    console.log(receiver + '님에게 키워드 알림 발송완료!');
  });

  return;
}