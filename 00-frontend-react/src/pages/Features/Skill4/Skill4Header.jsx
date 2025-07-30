import React from "react";

const Skill4Header = () => {
    return (
        <header className="flex flex-col justify-center items-center px-20 py-1.5 max-w-full text-center w-full max-md:px-5">
            <div className="flex flex-col ">
                <h1 className="self-start text-3xl font-extrabold leading-none text-slate-500">
                    IELTS 4-Skill Training
                </h1>
                <p className="mt-5 text-base leading-none text-zinc-800 max-md:max-w-full">
                    Practice your pronunciation by recording yourself reading the passage
                </p>
            </div>
        </header>
    );
};

export default Skill4Header;
