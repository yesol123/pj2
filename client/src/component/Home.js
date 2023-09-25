import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';



function Home() {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (event) => {
    // 입력된 닉네임을 상태에 업데이트
    setNickname(event.target.value);

    
  };
const navigate = useNavigate();

  const handleStartClick = () => {
    // 시작 버튼을 클릭하면 로컬 스토리지에 닉네임과 스코어 저장
    const userInfo = {
      nickname: nickname, // 닉네임 변수
      score: 0, // 초기 스코어 (0으로 시작하거나 다른 초기값으로 설정할 수 있음)
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate("/quiz1");
  };

  return (
    <div className='homedisplay'>
      <h3>닉네임을 입력하세요</h3>
      <input type='text' value={nickname} onChange={handleNicknameChange} />
      <button onClick={handleStartClick}> 시작 </button>
    </div>
  );
}


export default Home