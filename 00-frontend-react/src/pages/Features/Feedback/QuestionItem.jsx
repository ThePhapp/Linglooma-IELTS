// QuestionItem.jsx
import ScoreBadge from './ScoreBadge';

const QuestionItem = ({ number, falseWords, level, score, feedback }) => {
  return (
    <article className="flex gap-5 items-center mb-5 max-md:flex-col">
      <div className="text-lg font-bold bg-blue-200 rounded-full h-[60px] w-[60px] flex items-center justify-center">
        {number}
      </div>
      <div className="p-3.5 text-lg rounded bg-stone-300 bg-opacity-10 flex-[0_0_413px] max-md:flex-none max-md:w-auto">
        {falseWords}
      </div>
      <ScoreBadge level={level} score={score} />
      <div className="flex-1 p-3.5 text-lg rounded bg-cyan-300 bg-opacity-20 max-md:flex-none max-md:w-auto">
        {feedback}
      </div>
    </article>
  );
};

export default QuestionItem;
