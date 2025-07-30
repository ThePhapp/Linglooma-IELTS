import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import { FaMicrophone } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import HighlightTextWithTooltip from "./HighlightText";
import TextToSpeechButton from "./TextToSpeechButton";
import axios from "@/utils/axios.customize";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";



const RecordingPractice = ({ currentQuestion, referenceText, onScore, currentIndex }) => {
  const [lessonImage, setLessonImage] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [status, setStatus] = useState("Ready to record");
  const [scoreData, setScoreData] = useState(null);
  const recorderRef = useRef(null);
  const audioRef = useRef(null);
  const { lessonId } = useParams();

  useEffect(() => {
    const fetchLessonImage = async () => {
      try {
        const res = await axios.get("/api/lessons/all");

        const matchedLesson = res.find(
          (lesson) => lesson.id === parseInt(lessonId)
        );

        if (matchedLesson) {
          setLessonImage(matchedLesson.image);
        } else {
          toast.warn("Lesson ID not found in data.");
        }
      } catch (err) {
        toast.error("Failed to load lesson data", err);
      }
    };

    fetchLessonImage();
  }, [lessonId]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/wav",
        recorderType: RecordRTC.StereoAudioRecorder,
        desiredSampRate: 16000,
        numberOfAudioChannels: 1,
      });
      recorderRef.current.startRecording();
      setRecording(true);
      setStatus("Recording...");
      setScoreData(null);
      setAudioURL(null);
    } catch (err) {
      setStatus("Error accessing microphone: " + err.message);
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setRecording(false);
      setStatus("Recording stopped");

      if (recorderRef.current.stream) {
        recorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    });
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });


  const sendAudioToBackend = async () => {


    if (!recorderRef.current) {
      setStatus("No recording found");
      return;
    }

    setStatus("Sending audio to server...");

    try {
      const blob = recorderRef.current.getBlob();
      const base64Audio = await blobToBase64(blob);

      const data = await axios.post("/api/score-audio", {
        audio: base64Audio,
        referenceText,
        questionId: currentQuestion?.id,
        index: currentIndex,
      });

      if (data?.wordsAssessment) {
        setScoreData(data);
        setStatus("Results received");
        if (onScore) onScore(data);

        await axios.post(`/api/lessons/results`, {
          studentId: 1,
          lessonId: lessonId,
          finishedTime: new Date().toISOString(),
          averageScore: data.score,
          feedback: data.feedback,
        });

        await axios.post(`api/questions/results`, {
          studentId: 1,
          lessonResultId: lessonId,
          questionId: currentIndex + 1,
          ieltsBand: data.score,
          accuracy: data.accuracyScore,
          fluency: data.fluencyScore,
          completeness: data.completenessScore,
          pronunciation: data.pronScore,
          feedback: data.feedback,
        });

        await axios.post(`/api/incorrectphonemes/add`, {
          phoneme: data.err,
          questionResultId: 1,
          lessonResultId: lessonId,
          questionId: currentIndex + 1,
          studentId: 1,
        });

      } else {
        setStatus("Lỗi: dữ liệu phản hồi không hợp lệ");
        toast.error("Dữ liệu phản hồi không hợp lệ");
        setScoreData(null);
      }

    } catch (err) {
      setStatus("Connection error: " + err.message);
      toast.error(err.message);
      setScoreData(null);
    }
  };


  return (
    <section className="p-5 bg-white rounded-lg shadow-sm max-h-full mx-auto">
      <h2 className="py-1.5 mb-5 text-xl font-extrabold text-sky-800 border-b border-gray-200 text-center">
        Speaking Practice
      </h2>

      {/* Reference text + nút nghe */}
      <div className="mb-6 p-4 bg-blue-50 rounded text-center text-lg font-semibold text-blue-700 select-text flex items-center justify-center gap-2"
        style={{ minHeight: 70, lineHeight: "1.5", whiteSpace: "normal" }}>
        {scoreData?.wordsAssessment?.length > 0 ? (
          <HighlightTextWithTooltip
            text={referenceText}
            wordsAssessment={scoreData.wordsAssessment}
          />
        ) : (
          <span>{referenceText}</span>

        )}
        <TextToSpeechButton text={referenceText} />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-6 items-center">
          {!recording ? (
            <button
              onClick={startRecording}
              className="flex justify-center items-center w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
              aria-label="Start Recording"
            >
              <FaMicrophone size={40} />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex justify-center items-center w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition"
              aria-label="Stop Recording"
            >
              <FaMicrophone size={40} />
            </button>
          )}

          <Button
            variant="secondary"
            onClick={stopRecording}
            disabled={!recording}
            className="px-4 py-2"
          >
            Stop
          </Button>

          <Button
            variant="secondary"
            onClick={playAudio}
            disabled={!audioURL}
            className="px-4 py-2"
          >
            Play
          </Button>

          <Button
            variant="primary"
            onClick={sendAudioToBackend}
            disabled={!audioURL}
            className="px-4 py-2"
          >
            Submit
          </Button>
        </div>

        <p className="text-center font-semibold text-gray-700">{status}</p>

        {/* Audio player */}
        {audioURL && (
          <audio
            ref={audioRef}
            controls
            src={audioURL}
            className="w-full rounded shadow-md mt-4"
          />
        )}
      </div>
      {lessonImage && (
        <div className="w-full mt-5 flex justify-center">
          <img src={lessonImage} alt="Lesson illustration" width="400" height="250" className="rounded shadow" />
        </div>
      )}
    </section>
  );
};

export default RecordingPractice;