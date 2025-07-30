import React, { useState } from "react";
import SpeakingGrid from "./SpeakingGrid";
import RecordingPractice from "./RecordingPractice";
import IncorrectPhonemesTable from "./IncorrectPhonemesTable ";
import PhonemeDetails from "./PhonemeDetails ";

const IeltsSpeakingPractice = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [scoreData, setScoreData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <main className="min-h-screen h-screen flex flex-col bg-gradient-to-b from-[#F5F7FA] to-white">
            <div className="flex-1 flex flex-col p-5 gap-6 max-w-[1600px] w-full mx-auto h-full">
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-slate-600">
                        IELTS 4-Skill Training
                    </h1>
                    <p className="text-base text-zinc-800">
                        Practice your pronunciation by recording yourself reading the passage
                    </p>
                </header>

                <div className="flex flex-col md:flex-row flex-1">
                    {/* Left Side */}
                    <div className="flex flex-col w-full md:w-3/5 gap-5 h-full overflow-y-auto">
                        {/* <SpeechPrompt /> */}
                        <RecordingPractice
                            currentQuestion={currentQuestion}
                            currentIndex={currentIndex}
                            referenceText={currentQuestion?.content || "Chọn một câu hỏi"}
                            onScore={(data) => setScoreData(data)} // callback khi nhận kết quả
                        />
                    </div>

                    {/* Right Side */}
                    <div className="w-full md:w-1/3 h-full">
                        <SpeakingGrid
                            setCurrentQuestion={setCurrentQuestion}
                            setCurrentIndex={setCurrentIndex}
                        />
                    </div>

                </div>
                {/* Results */}
                {scoreData && (
                    <>
                        <section className="mt-10 bg-white rounded-lg p-6 shadow-lg w-full max-w-[1200px] mx-auto">
                            <h3 className="text-center text-2xl font-semibold text-blue-800 mb-6 border-b border-blue-300 pb-2 uppercase tracking-wide">
                                Test Results
                            </h3>

                            <div className="text-center mb-6">
                                <span className="text-lg font-medium mr-2">Band IELTS:</span>
                                <span className="text-3xl font-extrabold text-red-600">
                                    {scoreData.score ?? "N/A"}
                                </span>
                            </div>

                            <div className="grid grid-cols-4 gap-6 text-center text-gray-800 font-semibold text-lg">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Accuracy</div>
                                    <div>{scoreData.accuracyScore ?? "N/A"}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Fluency</div>
                                    <div>{scoreData.fluencyScore ?? "N/A"}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Completeness</div>
                                    <div>{scoreData.completenessScore ?? "N/A"}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Pronunciation</div>
                                    <div>{scoreData.pronScore ?? "N/A"}</div>
                                </div>
                            </div>

                            <div
                                className="mb-8 p-4 bg-gray-50 rounded border border-gray-200 text-gray-700 italic whitespace-pre-wrap text-left leading-relaxed"
                                style={{ minHeight: 100 }}
                            >
                                {scoreData.feedback ?? "No feedback provided."}
                            </div>

                            <div className="mt-8">
                                <PhonemeDetails phonemeDetails={scoreData.phonemeDetails} />
                            </div>
                        </section>

                        {/* Incorrect phonemes table */}
                        {scoreData.incorrectPhonemes && scoreData.incorrectPhonemes.length > 0 && (
                            <section className="mt-5 max-w-full w-full flex justify-center">
                                <IncorrectPhonemesTable data={scoreData.incorrectPhonemes} />
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default IeltsSpeakingPractice;
