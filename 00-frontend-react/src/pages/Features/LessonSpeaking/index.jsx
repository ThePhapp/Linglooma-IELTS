import React from "react";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";

const LessonSpeaking = () => {
    const navigate = useNavigate();


    return (
        <main className="p-6 w-full bg-white min-h-screen">
            {/* Exit button */}
            <div className="mb-6">
                <button
                    className="px-6 py-3 text-sm font-semibold text-white bg-slate-500 rounded-md"
                    onClick={() => navigate("/admin/features")}
                >
                    EXIT
                </button>
            </div>

            {/* Grid layout for CourseCards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <CourseCard
                    title="Bài 1 Technology"
                    imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/02a90a0b65e66df0963f1b5477527d2ac1445187?placeholderIfAbsent=true"
                    lessonId={1}
                />
                <CourseCard
                    title="Bài 2 Environment"
                    imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/1236d1d71bbeb3c3824f8ab88eb5159654b5e4d1?placeholderIfAbsent=true"
                    lessonId={2}
                />
                <CourseCard
                    title="Bài 3 Education"
                    imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/50ce905aa9a969e7683a8822bd451ce918855619?placeholderIfAbsent=true"
                    lessonId={3}
                />
                <CourseCard
                    title="Bài 4 Health"
                    imageUrl="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/ddc2f9e7faf4c399e595e15ab3f987f8785f338f?placeholderIfAbsent=true"
                    lessonId={4}
                />
                <CourseCard
                    title="Bài 5 Travel"
                    imageUrl="https://cdn-images.vtv.vn/2019/12/10/untitled-15759663392891201724352.png"
                    lessonId={5}
                />
                <CourseCard
                    title="Bài 6 Love"
                    imageUrl="https://bazaarvietnam.vn/wp-content/uploads/2023/04/HBVN-vuong-tu-ky-vuong-ngoc-van-trong-tinh-yeu-anh-danh-cho-em.jpg"
                    lessonId={6}
                />
            </div>

            {/* Optional: Decorative image at bottom */}
            <div className="mt-10 flex justify-center">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/80372bba8ffda745246c090a3e569e57d87e4beb?placeholderIfAbsent=true"
                    alt="Decorative"
                    className="object-contain w-full max-w-md"
                />
            </div>
        </main>
    );
};

export default LessonSpeaking;