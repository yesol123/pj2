import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cho_hangul from './cho_hangul';
import wordList from './wordlist'; 


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

  useEffect(() => {
    // 랜덤 단어와 그 정의를 가져오는 함수 정의
    const fetchRandomWordAndDefinition = () => {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

      axios.get(`https://opendict.korean.go.kr/api/search?key=4E4101E1F9C6B578FCE4D6CABE483676&target_type=search&req_type=json&part=word&q=${randomWord}`)
        .then((res) => {
          const items = res.data;
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
          setUserAnswer(''); // 정답을 맞춘 후에 input 값을 비움
        })
        .catch((error) => {
          console.error('API 호출 중 오류 발생:', error);
        });
    };
    // 초기에 랜덤 단어와 정의를 가져오는 함수 호출
    fetchRandomWordAndDefinition();
  }, [score]);



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
        console.log(newScore); // 정답을 맞춘 경우 업데이트된 점수를 로그로 출력
      } else {
        console.log('오답입니다.');
        // 오답 처리 로직 추가
        axios.post('http://localhost:3030/insert',{ nickname, score })
        .then(res=>{
          navigate('/result');
        })
        //서버 gameData.json으로 넘겨주는 작업 해주면 되는거? 
        //result에서 결과값을 보여준다 
        //다시 서버에 있는 업데이트된 데이터를 가져와서 result화면에 출력

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
            <p>{score}:점</p>
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