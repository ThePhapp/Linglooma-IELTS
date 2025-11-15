import React from "react";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, History, BookOpen } from "lucide-react";

const LessonSpeaking = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                {/* Title & Navigation */}
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 rounded-2xl shadow-2xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                <BookOpen className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    Speaking Practice Lessons
                                </h1>
                                <p className="text-white/90 mt-1">
                                    Choose a topic and start practicing your English speaking skills
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                onClick={() => navigate("/admin/features")}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back</span>
                            </button>
                            <button
                                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-purple-600 bg-white rounded-xl hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                onClick={() => navigate("/admin/features/speaking/history")}
                            >
                                <History className="h-4 w-4" />
                                <span>My History</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid layout for CourseCards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <CourseCard
                        title="Technology"
                        topic="Bài 1"
                        imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/02a90a0b65e66df0963f1b5477527d2ac1445187?placeholderIfAbsent=true"
                        lessonId={1}
                        gradient="from-blue-500 to-cyan-600"
                    />
                    <CourseCard
                        title="Environment"
                        topic="Bài 2"
                        imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/1236d1d71bbeb3c3824f8ab88eb5159654b5e4d1?placeholderIfAbsent=true"
                        lessonId={2}
                        gradient="from-green-500 to-emerald-600"
                    />
                    <CourseCard
                        title="Education"
                        topic="Bài 3"
                        imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/50ce905aa9a969e7683a8822bd451ce918855619?placeholderIfAbsent=true"
                        lessonId={3}
                        gradient="from-purple-500 to-violet-600"
                    />
                    <CourseCard
                        title="Health"
                        topic="Bài 4"
                        imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/ddc2f9e7faf4c399e595e15ab3f987f8785f338f?placeholderIfAbsent=true"
                        lessonId={4}
                        gradient="from-pink-500 to-rose-600"
                    />
                    <CourseCard
                        title="Travel"
                        topic="Bài 5"
                        imageUrl="https://cdn-images.vtv.vn/2019/12/10/untitled-15759663392891201724352.png"
                        lessonId={5}
                        gradient="from-orange-500 to-amber-600"
                    />
                    <CourseCard
                        title="Love & Relationships"
                        topic="Bài 6"
                        imageUrl="https://bazaarvietnam.vn/wp-content/uploads/2023/04/HBVN-vuong-tu-ky-vuong-ngoc-van-trong-tinh-yeu-anh-danh-cho-em.jpg"
                        lessonId={6}
                        gradient="from-red-500 to-pink-600"
                    />
                </div>
            </div>
        </main>
    );
};

export default LessonSpeaking;