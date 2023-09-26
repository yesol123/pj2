import React, { useState } from 'react'
import axios from 'axios';

const img = './horang.png'


function Result() {
    const [allUsersData, setAllUsersData] = useState([]);
    axios.get(`${process.env.REACT_APP_SERVER}`)
        .then(res => {
            setAllUsersData(res.data);
        })

    // 점수를 기준으로 정렬
    allUsersData.sort((a, b) => b.score - a.score);


    return (
        <>
            <section className='result'>
                <h3>세종의 후예들</h3>
                <ul>
                    {allUsersData
                        .slice(0, 10)//상위 10개 항목 선택
                        .map((user, index) => (
                            <li key={index}>
                                <span>{index + 1}</span>
                                <p>{user.nickname}</p>
                                <span>{user.score}점</span>
                                {index < 3 ? <p>장원급제</p> : <p>낙제</p>} {/*//순위 1,2,3번째 */}
                            </li>
                        ))}
                </ul>

                <article className='show'>
                    <ul>
                        {allUsersData
                            .slice(0, 3) // 상위 3명 선택 (1, 2, 3위)
                            .map((user, index) => (
                                <li key={index}>
                                    <img src={`${img}`} />
                                    <p><span>{index + 1}</span>{user.nickname}</p>
                                </li>
                            ))}
                    </ul>
                </article>

            </section>



        </>
    )
}

export default Result