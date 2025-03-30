import React, { useState, useRef, useEffect } from "react";
import styles from './card.module.css';
import musics from '../../assets/data';
import {timer} from './timer';
import {$api} from "../../api/index.js";

const Player = ({props: { musicNumber, setMusicNumber }}) => {
    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [pitch, setPitch] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState(null);
    
    const audioRef = useRef();
    const audioContextRef = useRef(null);
    const sourceNodeRef = useRef(null);
    const gainNodeRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);
    
    useEffect(() => {
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
            if (mediaRecorderRef.current && isRecording) {
                mediaRecorderRef.current.stop();
            }
        };
    }, [isRecording]);
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);
    
    useEffect(() => {
        if (sourceNodeRef.current) {
            sourceNodeRef.current.detune.value = pitch;
        }
    }, [pitch]);
    
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                // Try to use MP3 format if supported, otherwise fall back to default
                let options = {};
                try {
                    const supportsMp3 = MediaRecorder.isTypeSupported('audio/mpeg');
                    if (supportsMp3) {
                        options = { mimeType: 'audio/mpeg' };
                    }
                } catch (e) {
                    console.log('MP3 recording not supported, using default format');
                }
                
                mediaRecorderRef.current = new MediaRecorder(stream, options);
                recordedChunksRef.current = [];
                
                // Determine file extension based on actual MIME type
                const fileExtension = mediaRecorderRef.current.mimeType.includes('audio/mpeg') ? 'mp3' : 'webm';
                
                mediaRecorderRef.current.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        recordedChunksRef.current.push(e.data);
                    }
                };
                
                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(recordedChunksRef.current, { type: mediaRecorderRef.current.mimeType });
                    recordedChunksRef.current = [];
                    sendRecording(blob, fileExtension);
                    
                    // Stop all tracks to release microphone
                    stream.getTracks().forEach(track => track.stop());
                };
                
                mediaRecorderRef.current.start();
                setIsRecording(true);
            });
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const sendRecording = async (blob, fileExtension = 'webm') => {
        try {
            const formData = new FormData();
            const masterBlobThumbnail = musics[musicNumber].thumbnail
            
            const masterMusicResponse = await fetch(masterBlobThumbnail);
            const masterMusicBlob = await masterMusicResponse.blob();
            
            formData.append('file1', masterMusicBlob, 'file1.mp3');
            formData.append('file2', blob, `file2.${fileExtension}`);
            
            const response = $api.post("api/v1/compare_melodies", formData)
            
            if (response.ok) {
                alert('Запись успешно отправлена');
            } else {
                console.error('Failed to send recording');
                alert('Не удалось отправить запись');
            }
        } catch (error) {
            console.error('Error sending recording:', error);
            alert('Ошибка при отправке записи');
        }
    };

    function handleLoadStart(e){
        const src = e.nativeEvent.srcElement.src;
        const audio = new Audio(src);
        audio.onloadedmetadata = function(){
            if(audio.readyState > 0){
                setDuration(audio.duration);
            }
        }

        if(play){
            audioRef.current.play();
        }
        
        audioRef.current.playbackRate = playbackRate;
    }

    function handlePlayingAudio(){
        if(play){
            audioRef.current.pause();
            setPlay(false);
        }else{
            audioRef.current.play();
            setPlay(true);
        }
    }

    function handleTimeUpdate(){
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime)
    }

    function changeCurrentTime(e){
        const currentTime = Number(e.target.value);
        audioRef.current.currentTime = currentTime;
        setCurrentTime(currentTime);
    }

    function handleNextPrev(n){
        setMusicNumber(value => {
            if(n > 0)                
                return value + n > musics.length - 1 ? 0 : value + n;
            return value + n < 0 ? musics.length - 1 : value + n;
            
        })

    }

    function handlePlaybackRateChange(e) {
        const newRate = parseFloat(e.target.value);
        setPlaybackRate(newRate);
        if (audioRef.current) {
            audioRef.current.playbackRate = newRate;
        }
    }
    
    function handlePitchChange(e) {
        const newPitch = parseInt(e.target.value);
        setPitch(newPitch);
        
        if (sourceNodeRef.current) {
            sourceNodeRef.current.detune.value = newPitch;
        }
    }

    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
    return(
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.about}>
                    <div className={styles.image}>
                        <img src={musics[musicNumber].thumbnail} alt="" />
                    </div>
                    <div className={styles.details}>
                        <p className={styles.artist}>{musics[musicNumber].artist}</p>
                        <marquee behavior="alternate" scrolldelay="300" className={styles.title}>{musics[musicNumber].title}</marquee>
                        <p className={styles.version}>Версия от BrassBook</p>
                    </div>
                </div>
                
                <div className={styles.progress}>
                    <input className="styled-slider slider-progress" type="range" min={0} max={duration} value={currentTime} onChange={e => changeCurrentTime(e)} />
                    <div className={styles.timer}>
                        <span>{timer(currentTime)}</span>
                        <span>{timer(duration)}</span>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button onClick={() => handleNextPrev(-1)}>
                        <p className="_icon-prev"></p>
                    </button>

                    <div className={styles.play}>
                        <button onClick={handlePlayingAudio}>
                            {play ? <div className="_icon-pause"></div> : <p className="_icon-play-white"></p> }
                        </button>
                    </div>

                    <button onClick={() => handleNextPrev(1)}>
                        <p className="_icon-next"></p>
                    </button>

                    <audio src={musics[musicNumber].src} hidden
                    onLoadStart={handleLoadStart} ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => handleNextPrev(1)}></audio>

                </div>
                
                <div className={styles.playbackControls}>
                    <p>Скорость воспроизведения: {playbackRate.toFixed(1)}x</p>
                    <input 
                        type="range" 
                        min="0.5" 
                        max="2" 
                        step="0.1" 
                        value={playbackRate} 
                        onChange={handlePlaybackRateChange}
                        className="styled-slider slider-progress"
                    />
                </div>
                
                <div className={styles.toneControls}>
                    <p>Тон: {pitch > 0 ? `+${pitch}` : pitch}</p>
                    <input 
                        type="range" 
                        min="-1200" 
                        max="1200" 
                        step="100" 
                        value={pitch} 
                        onChange={handlePitchChange}
                        className="styled-slider slider-progress"
                    />
                </div>
                
                <button className={styles.download}>
                    <p>
                        <span className="_icon-download"></span>
                        <span>Скачать композицию</span>
                    </p>
                </button>
                
                <button 
                    className={`${styles.record} ${isRecording ? styles.recording : ''}`}
                    onClick={isRecording ? stopRecording : startRecording}
                >
                    <p>
                        <span className={isRecording ? "_icon-stop" : "_icon-mic"}></span>
                        <span>{isRecording ? "Остановить запись" : "Записать с микрофона"}</span>
                    </p>
                </button>
                
                <div className={styles.rate}>
                    <p>Оцени это произведение</p>
                    <div className={styles.rate__container}>
                        <button>
                            <img src="/src/assets/images/face-0.png" alt="" />
                        </button>
                        <button>
                            <img src="/src/assets/images/face-1.png" alt="" />
                        </button>
                        <button>
                            <img src="/src/assets/images/face-2.png" alt="" />
                        </button>
                        <button>
                            <img src="/src/assets/images/face-3.png" alt="" />
                        </button>
                        <button>
                            <img src="/src/assets/images/face-4.png" alt="" />
                        </button>
                    </div>
                
                </div>
            </div>
        </div>

    )
}

export default Player;

export {Player};