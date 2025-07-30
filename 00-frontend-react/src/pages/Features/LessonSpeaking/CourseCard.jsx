import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ title, imageUrl, lessonId }) => {

    const navigate = useNavigate();
    const handleLearnClick = () => {
        if (lessonId) {
            navigate(`/admin/features/practice/${lessonId}`);
        } else {
            console.log("Không có lessonId cho:", title);
        }
    }

    return (
        <article className="flex flex-col px-16 py-4 w-full bg-white rounded-lg shadow-[0px_2px_10px_rgba(0,0,0,0.1)] max-md:px-5">
            <header className="self-center pb-6 max-w-full text-lg font-extrabold leading-none text-sky-800 border-b border-zinc-100 w-[166px]">
                {title}
            </header>
            <img
                src={imageUrl}
                className="object-contain mt-3.5 w-full aspect-[1.2]"
                alt={title}
            />
            <div className="flex shrink-0 ml-8 h-[35px] w-[151px] max-md:ml-2.5" />
            <button
                onClick={handleLearnClick}
                className="self-center px-14 py-3.5 max-w-full text-sm font-bold leading-none text-center text-white whitespace-nowrap rounded bg-slate-500 w-[151px] max-md:px-5">
                LEARN
            </button>
        </article>
    );
};

export default CourseCard;
