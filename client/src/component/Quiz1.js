import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cho_hangul from './cho_hangul';



function Quiz1() {
  const navigate = useNavigate();
  const [definition, setDefinition] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const img = './Rectangle.png'
  const [nickname, setNickname] = useState(JSON.parse(localStorage?.userInfo).nickname);

  // console.log(res.data.channel.item);
  //   console.log(res.data.channel.item[0].word) //단어
  //   console.log(res.data.channel.item[0].sense[0].definition) //정의



    // 랜덤 단어와 그 정의를 가져오는 함수 정의

    const key = 'key=4E4101E1F9C6B578FCE4D6CABE483676';
    const quiz =  () => {
      const wordList = [
        '주선', '부정', '기차', '사과', '구두', '반장', '명사', '농부', '도덕', '해일', '당직', '냉각', '단독', '새', '가식', '가방', '꿈', '개인', '까치', '남극', '각성', '난초', '수동', '나비', '나무', '아이', '집사', '머리', '하마', '파도', '가난', '사자', '박수', '사이', '가문', '휴식', '저장', '사슴', '이발', '지연', '말', '루틴', '단장', '도로', '이변', '대수', '기린', '초성', '초선', '코로나', '포도', '퐁퐁', '차고', '치성', '기적', '노래', '노가리',
        '대학', '민경', '도리', '도둑', '도전', '독종', '독해', '도적', '동심', '동자', '동행', '동전', '등록', '딱딱', '리터', '마음', '막대', '매실', '매일', '매화', '맹세', '망치', '명량', '명성', '명언', '명예', '명중', '모드', '뭉치', '무법', '무적', '무제', '문화', '물리', '물매', '바보', '박자', '바람', '방송', '방울', '발표', '발포', '방정', '배달', '방출', '방패', '방황', '방침', '배려', '연패', '법정', '병력', '벼락', '변경', '보호', '보석', '부록', '부채', '분개', '분파', '분홍', '비단', '비상', '비행', '비명', '인형', '비치', '비평', '사람', '사관', '사회', '삭제', '사탕', '산호', '살림', '상황', '살성', '산전', '살수', '상어', '상인', '상처', '상의', '생수', '상큼', '상품', '생기', '생동', '생선', '서론', '서버', '석화', '석현', '도예', '주영', '지영', '유진', '민지', '현지', '정아', '주연', '윤하', '정민', '오성', '호성', '선비', '선택', '선호', '설정', '성공', '세계', '성인', '세상', '소개', '소원', '소정', '소설', '속박', '수갑', '수분', '수달', '수면', '수박', '수색', '수영', '수정', '수지', '순차', '시인', '시합', '신문', '시선', '신사', ''
      ];
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

      axios
      .get(`https://port-0-pj2server-1xxfe2blm48b9h5.sel5.cloudtype.app/openapi?randomWord=${randomWord}`)
      .then((res) => {
          const items = res.data.channel.item;
          console.log(items)

          // 랜덤 아이템과 의미 선택
          const randomItemIndex = Math.floor(Math.random() * Math.min(items.length, 2));
          const randomItem = items[randomItemIndex];
          const senses = randomItem.sense;
          const randomSenseIndex = Math.floor(Math.random() * Math.min(senses.length, 2));
          const randomSense = senses[randomSenseIndex];
          // 상태에 정의와 정답 업데이트
          setDefinition(randomSense.definition);
          setCorrectAnswer(randomItem.word);
          setUserAnswer('');
        })
        .catch((error) => {
          console.error('API 호출 중 오류 발생:', error);
        });
    };

  useEffect(() => {
    // 초기에 랜덤 단어와 정의를 가져오는 함수 호출
    quiz();
  }, [score]);

  console.log('score',score)

  function generateSpanElements(word) {
    if (!word) {
      return null; // 단어가 없으면 아무것도 반환하지 않음
    }
    const spanElements = [];
    for (let i = 0; i < word.length; i++) {
      spanElements.push(<span key={i}>{word[i]}</span>);
    }
    return spanElements;
  }

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const provideHint = (word) => {
    return cho_hangul(word); // cho_hangul 함수를 사용하여 초성 힌트 생성
  };
  
  const handleEnterKeyPress = (event) => {
    event.preventDefault();
      // 엔터 키를 눌렀을 때 정답 확인 로직 추가
      if (userAnswer === correctAnswer) {
        console.log('정답입니다.');
        // 정답 처리 로직 추가
        const newScore = score + 1; // 증가된 스코어 계산
        setScore(newScore); // 스코어 상태 업데이트
        // quiz();
      } else {
        console.log('오답입니다.');
        // 오답 처리 로직 추가
        axios.post('https://port-0-pj2server-1xxfe2blm48b9h5.sel5.cloudtype.app/insert',{ nickname, score })
        .then(res=>{
          navigate('/result');
        })

      }
  };


  return (
    <>
      <article className='quizdisplay'>
        <div>
          <h3>문제.{score + 1}</h3>
          <p className='quizq'>{definition}</p>
        </div>
        <section>
          <div>  {Array.from({ length: correctAnswer.length }, (_, index) => (
            <span key={index}><img src={img} /></span>))}
          </div>

          <div className='score'>
            <p><span>{nickname}</span>님의 현재 점수</p>
            <p>{score}점</p>
          </div>

          {/* 초성 힌트 표시 */}
          <div className='cho'>
            <p>초성 힌트: {provideHint(correctAnswer)}</p>
          </div>

          <form className='input' onSubmit={handleEnterKeyPress}>
            <input type='text' placeholder='정답을 입력하세요' value={userAnswer} onChange={handleInputChange}/>
            <button >입력</button>
          </form>
        </section>
      </article>
    </>
  )
}

export default Quiz1