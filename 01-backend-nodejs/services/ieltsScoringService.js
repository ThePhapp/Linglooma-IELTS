/**
 * Hàm tính điểm IELTS speaking chuẩn dựa trên điểm Azure và trả feedback sát thực tế
 * @param {object} assessment
 * @returns {object}
 */
function calculateIELTSBand(assessment) {
  const accuracyRaw = assessment.AccuracyScore || 0;      // tương tự Grammar+Accuracy trong IELTS
  const fluencyRaw = assessment.FluencyScore || 0;    
  const completenessRaw = assessment.CompletenessScore || 0; 
  const pronScoreRaw = assessment.PronScore || 0;          // Pronunciation

  // Chuẩn hóa điểm về thang 0-9
  const scaleTo9 = (score) => (score / 100) * 9;

  const accuracy = scaleTo9(accuracyRaw);
  const fluency = scaleTo9(fluencyRaw);
  const completeness = scaleTo9(completenessRaw);
  const pronunciation = scaleTo9(pronScoreRaw);

  const weights = {
    accuracy: 0.25,
    fluency: 0.2,
    completeness: 0.25,
    pronunciation: 0.3,
  };

  const weightedAverage =
    accuracy * weights.accuracy +
    fluency * weights.fluency +
    completeness * weights.completeness +
    pronunciation * weights.pronunciation;

  function roundBand(score) {
    const floor = Math.floor(score);
    const diff = score - floor;

    if (diff < 0.25) return floor;
    else if (diff < 0.75) return floor + 0.5;
    else return floor + 1;
  }

  const band = roundBand(weightedAverage);

  return {
    band,
    totalScore: weightedAverage.toFixed(2),
  };
}

module.exports = { calculateIELTSBand };
