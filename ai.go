package main

import (
	"strings"
)

// GeneratePerformanceInsightsInput represents the input to the generatePerformanceInsights function.
type GeneratePerformanceInsightsInput struct {
	EmployeeID      string            `json:"employeeId"`
	SelfEvaluation  map[string]string `json:"selfEvaluation"`
	ManagerFeedback map[string]string `json:"managerFeedback"`
}

// GeneratePerformanceInsightsOutput represents the output of the generatePerformanceInsights function.
type GeneratePerformanceInsightsOutput struct {
	Strengths           string `json:"strengths"`
	AreasForImprovement string `json:"areasForImprovement"`
}

// generatePerformanceInsights calls a language model to generate performance insights.
// This implementation provides basic analysis of self-evaluation and manager feedback.
func generatePerformanceInsights(input GeneratePerformanceInsightsInput) (GeneratePerformanceInsightsOutput, error) {
	var strengths []string
	var areasForImprovement []string

	// Analyze self-evaluation and manager feedback for strengths and areas for improvement.
	for topic := range input.SelfEvaluation {
		managerFeedback, ok := input.ManagerFeedback[topic]
		if ok {
			// Check for positive keywords in manager feedback.
			if strings.Contains(strings.ToLower(managerFeedback), "good") ||
				strings.Contains(strings.ToLower(managerFeedback), "strong") ||
				strings.Contains(strings.ToLower(managerFeedback), "excellent") {
				strengths = append(strengths, topic)
			}

			// Check for areas needing improvement in manager feedback.
			if strings.Contains(strings.ToLower(managerFeedback), "improve") ||
				strings.Contains(strings.ToLower(managerFeedback), "develop") ||
				strings.Contains(strings.ToLower(managerFeedback), "need") {
				areasForImprovement = append(areasForImprovement, topic)
			}
		}
	}

	// If no strengths are identified, default to a generic statement.
	if len(strengths) == 0 {
		strengths = append(strengths, "Good overall performance")
	}

	return GeneratePerformanceInsightsOutput{
		Strengths:           strings.Join(strengths, ", "),
		AreasForImprovement: strings.Join(areasForImprovement, ", "),
	}, nil
}