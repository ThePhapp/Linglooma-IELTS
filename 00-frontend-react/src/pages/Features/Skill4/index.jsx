import React from "react";
import { PracticeCard } from "./PracticeCard";
import Skill4Header from "./Skill4Header";

const Skill4 = () => {

    return (
        <main className="overflow-hidden bg-white">
            <div className="flex flex-col lg:flex-row min-h-screen">
                <section className="w-full px-6 py-6">
                    <div className="max-w-screen-xl mx-auto">
                        <Skill4Header />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                            <div className="min-h-[400px]">
                                <PracticeCard
                                    title="🎧 Listening Practice"
                                    description="Immerse yourself in a variety of real-life IELTS listening scenarios — from academic lectures to everyday conversations. Enhance your focus, improve your vocabulary, and master tricky question types like sentence completion, multiple choice, and more. 🎯 Get ready to sharpen your ears and train your mind!"
                                />
                            </div>

                            <div className="min-h-[400px]">
                                <PracticeCard
                                    title="🎙️ Speaking Practice"
                                    description="Boost your confidence and fluency by practicing real IELTS speaking topics. 🎤 Record, review, and refine your responses with AI-powered feedback. From part 1 introductions to part 3 deep discussions, you’ll learn to express your ideas clearly and naturally — just like a native speaker!"
                                />

                            </div>

                            <div className="min-h-[400px]">
                                <PracticeCard
                                    title="📖 Reading Practice"
                                    description="Unlock the secrets to fast and accurate reading. Dive into passages on science, history, and culture while tackling questions that challenge your logic, vocabulary, and attention to detail. 🧠 Perfect your skimming, scanning, and inference skills — one paragraph at a time!"
                                />
                            </div>

                            <div className="min-h-[400px]">
                                <PracticeCard
                                    title="✍️ Writing Practice"
                                    description="Master the art of essay writing with structured tasks tailored to the IELTS format. From analyzing data in Task 1 to constructing arguments in Task 2, you’ll learn to plan, draft, and polish your writing with clarity and precision. ✨ Let your words flow with confidence!"
                                />
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </main>
    );
};

export default Skill4;

