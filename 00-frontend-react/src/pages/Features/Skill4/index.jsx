import React from "react";
import { PracticeCard } from "./PracticeCard";
import Skill4Header from "./Skill4Header";

const Skill4 = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="flex flex-col lg:flex-row">
                <section className="w-full px-6 py-8">
                    <div className="max-w-screen-xl mx-auto">
                        <Skill4Header />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                            <PracticeCard
                                title="Listening Practice"
                                emoji="🎧"
                                description="Immerse yourself in a variety of real-life IELTS listening scenarios — from academic lectures to everyday conversations. Enhance your focus, improve your vocabulary, and master tricky question types."
                                gradient="from-pink-500 to-rose-600"
                                bgColor="bg-pink-50"
                            />

                            <PracticeCard
                                title="Speaking Practice"
                                emoji="🎤"
                                description="Boost your confidence and fluency by practicing real IELTS speaking topics. Record, review, and refine your responses with AI-powered feedback. Learn to express your ideas clearly and naturally."
                                gradient="from-purple-500 to-violet-600"
                                bgColor="bg-purple-50"
                            />

                            <PracticeCard
                                title="Reading Practice"
                                emoji="📖"
                                description="Unlock the secrets to fast and accurate reading. Dive into passages on science, history, and culture while tackling questions that challenge your logic, vocabulary, and attention to detail."
                                gradient="from-blue-500 to-cyan-600"
                                bgColor="bg-blue-50"
                            />

                            <PracticeCard
                                title="Writing Practice"
                                emoji="✍️"
                                description="Master the art of essay writing with structured tasks tailored to the IELTS format. From analyzing data in Task 1 to constructing arguments in Task 2, you'll learn to plan, draft, and polish your writing."
                                gradient="from-green-500 to-emerald-600"
                                bgColor="bg-green-50"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Skill4;
