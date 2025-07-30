import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts';

const QuestionScoreChart = ({ questions }) => {
    const chartData = questions.map((q) => ({
        name: `Q${q.questionId}`,
        score: q?.averageScores?.ieltsBand || 0,
    }));

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Biểu đồ điểm từng câu hỏi</h3>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} tickCount={10} />
                    <Tooltip />
                    <Bar dataKey="score">
                        {chartData.map((entry, index) => {
                            let color = "#22c55e"; // green
                            if (entry.score < 4) color = "#ef4444"; // red
                            else if (entry.score <= 6) color = "#facc15"; // yellow

                            return <Cell key={`cell-${index}`} fill={color} />;
                        })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex gap-4 mt-4">
                <LegendItem color="#ef4444" label="Dưới 4 - Yếu" />
                <LegendItem color="#facc15" label="Từ 4 đến 6 - Trung bình" />
                <LegendItem color="#22c55e" label="Trên 6 - Tốt" />
            </div>
        </div>
    );
};

// Legend item component
const LegendItem = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: color }}></span>
        <span className="text-sm">{label}</span>
    </div>
);

export default QuestionScoreChart;
