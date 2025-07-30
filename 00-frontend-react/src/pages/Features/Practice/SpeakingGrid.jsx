import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/utils/axios.customize";
import { toast } from "react-toastify";


const GridButton = ({ number, active, onClick }) => {
    return (
        <div
            onClick={() => onClick(number)}
            className={`text-3xl font-bold aspect-square rounded-[50px] flex items-center justify-center ${active ?
                "bg-slate-500 text-white" : "bg-neutral-300 text-black"
                }`}
        >
            {number}
        </div>
    );
};

const SpeakingGrid = ({ setCurrentQuestion, setCurrentIndex }) => {

    const navigate = useNavigate();
    const { lessonId } = useParams();
    const [showConfirm, setShowConfirm] = useState(false);

    const [activeNumber, setActiveNumber] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [lessonTitle, setLessonTitle] = useState("");

    // Confirm feedback
    const handleFeedbackClick = () => {
        if (questions.length > 0 && activeNumber < questions.length) {
            setShowConfirm(true); // Hiện confirm
        } else {
            navigate(`/admin/features/feedback/${lessonId}`);
        }
    };

    const handleClick = (index) => {
        setActiveNumber(index + 1);
        const question = questions[index];
        if (question) {
            setCurrentQuestion(question);
            setCurrentIndex(index);
        }
    };


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await axios.get(`/api/questions/${lessonId}`);

                // Nếu data có message và không có questions thì báo lỗi rồi return luôn
                if (data.message && (!data.questions || !Array.isArray(data.questions))) {
                    toast.error(data.message);
                    setQuestions([]);
                    return; // Dừng không chạy tiếp, tránh gọi toast lần nữa
                }

                // Nếu có questions hợp lệ thì set state
                if (data.questions && Array.isArray(data.questions)) {
                    setQuestions(data.questions);
                    if (data.questions.length > 0) {
                        setCurrentQuestion(data.questions[0]);
                        setCurrentIndex(0);
                        setLessonTitle(data.questions[0].name || "");
                    }
                } else {
                    // Trường hợp không có message, không có questions
                    toast.error("Dữ liệu không hợp lệ từ server");
                    setQuestions([]);
                }
            } catch (err) {
                console.error("Lỗi fetch API:", err);
                toast.error("Lỗi fetch API: " + (err.message || err));
                setQuestions([]);
            }
        };

        fetchQuestions();
    }, [lessonId]);



    return (
        <section className="flex-1 p-5 bg-white rounded-lg shadow-sm h-[700px]">
            <div className="flex flex-col items-center gap-10">
                <h2 className="py-1.5 mb-5 text-lg font-extrabold text-sky-800 border-[0.67px] border-zinc-100">
                    Speaking
                </h2>
                <h3 className="mb-5 text-lg font-extrabold text-sky-800">
                    Bài {lessonId} {lessonTitle}
                </h3>
                <div className="grid grid-cols-3 gap-5 w-full max-w-[350px]">
                    {questions.map((q, index) => (
                        <GridButton
                            key={index}
                            number={index + 1}
                            active={activeNumber === (index + 1)}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
                <div className="flex  gap-10">
                    <Button variant="primary" className="mt-5" onClick={handleFeedbackClick}>
                        Feedback
                    </Button>
                    <Button variant="primary" className="mt-5" onClick={() => navigate("/admin/features/lesson")}>
                        Exit
                    </Button>
                    {showConfirm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-[400px] w-full">
                                <h2 className="text-xl font-semibold mb-4">Bạn chưa làm xong tất cả các câu</h2>
                                <p className="mb-4">Bạn vẫn muốn xem feedback chứ?</p>
                                <div className="flex justify-end gap-4">
                                    <Button
                                        variant="secondary"
                                        onClick={() => setShowConfirm(false)}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate(`/admin/features/feedback/${lessonId}`)}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
};

export default SpeakingGrid;
