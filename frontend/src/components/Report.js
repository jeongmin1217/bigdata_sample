import React, { useRef, useState, useEffect } from 'react';
import '../styles/report.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Report() {
    const [weeklyScore, setWeeklyScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weeklyImageTrue, setWeeklyImageTrue] = useState(null);
    const [weeklyImageFalse, setWeeklyImageFalse] = useState(null);
  
    useEffect(() => {
      fetchWeeklyData();
      fetchWeeklyImages();
    }, []);

    const fetchWeeklyData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/logs/get-weekly-data/');
            setWeeklyScore(response.data.score);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch weekly data", error);
            setLoading(false);
        }
      };

    const fetchWeeklyImages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/logs/get-weekly-average-landmarks-image/');
            setWeeklyImageTrue(response.data.image_true);
            setWeeklyImageFalse(response.data.image_false);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch weekly image", error);
            setLoading(false);
        }
    };
    
    if (loading) {
        return (
            <div className="loading-icon">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <p>주간 데이터를 불러오는 중입니다.</p>
            </div>
        );
    }

    return (
        <div className="App-report">
            <div className="header-report">
                <div className='header-report-icon-div'>
                    <img className="header-report-icon" src={`${process.env.PUBLIC_URL}/icon1.PNG`} alt="icon" />
                </div>
                <div className='header-report-main'>
                    <div className='header-report-main-text'>
                        <p className='header-report-title'>지난 일주일간 평균 자세를 제공합니다</p>
                        <p className='header-report-description'>C7 포인트 : 경추 중 가장 돌출된 일곱 번째 경추뼈로, 자세 평가와 치료에서의 중요한 기준점</p>
                    </div>
                    <div className='header-report-main-icon'>
                        <div className="selectionIcon">
                            <Link to="/">
                                <FontAwesomeIcon icon={faHome} style={{color: "#8871e6", fontSize:"27px"}} />
                            </Link>
                        </div>

                        <div className="selectionIcon-report">
                            <Link to="/calendar">
                                <FontAwesomeIcon icon={faCalendar} style={{color: "#8871e6", fontSize:"27px"}} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content-report">
                <div className="posture-container">
                    <p className="posture-container-title">옳은 자세의 평균 포인트</p>
                    <div className="short-line"></div>
                    {weeklyImageTrue && <img src={`data:image/png;base64,${weeklyImageTrue}`} alt="Weekly Average Landmarks True" />}
                </div>
                <div className="posture-container">
                    <p className="posture-container-title">옳지 않은 자세의 평균 포인트</p>
                    <div className="short-line"></div>
                    {weeklyImageFalse && <img src={`data:image/png;base64,${weeklyImageFalse}`} alt="Weekly Average Landmarks False" />}
                </div>
            </div>

            <div className="controls-report">
                <p className="report-score">주간 점수: {weeklyScore ? weeklyScore : 'N/A'}점</p>
            </div>
        </div>
        )
}

export default Report