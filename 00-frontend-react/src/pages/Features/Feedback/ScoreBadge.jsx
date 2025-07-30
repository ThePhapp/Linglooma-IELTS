// ScoreBadge.jsx
const ScoreBadge = ({ level, score }) => {
  const getBadgeColor = (level) => {
    if (level === 'Pending') return 'bg-red-600';
    return 'bg-green-600';
  };

  // Nếu score <= 10 thì không thêm %, giả sử điểm IELTS
  const displayScore = score > 10 ? `${score}%` : score;

  return (
    <div className="p-3.5 text-center rounded bg-stone-300 bg-opacity-10 w-[141px] max-md:flex-none max-md:w-auto">
      <div
        className={`px-2 py-1 mb-1.5 text-xs font-bold leading-6 text-white ${getBadgeColor(
          level
        )} rounded`}
      >
        {level}
      </div>
      <div className="text-xl font-bold">{displayScore}</div>
    </div>
  );
};

export default ScoreBadge;
