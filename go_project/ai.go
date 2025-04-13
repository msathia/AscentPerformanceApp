package main

import (
	"context"
	"fmt"
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
func generatePerformanceInsights(ctx context.Context, input GeneratePerformanceInsightsInput) (GeneratePerformanceInsightsOutput, error) {
	prompt := fmt.Sprintf(`You are a performance analysis expert. Analyze the self-evaluation and manager feedback provided below to identify key strengths and areas for improvement for the employee.

  Here's an example of good feedback:
  "SME: [Self] I have a strong understanding of the core concepts in my domain. [Manager] John is a recognized expert in the team and is often consulted for his knowledge."
  
  When analyzing the feedback, consider the following:
  - Look for patterns and themes in the feedback.
  - Identify specific skills or behaviors mentioned.
  - Note any discrepancies or agreements between self-evaluation and manager feedback.

  Employee ID: %s

  Self-Evaluation:
  %s

  Manager Feedback: 
  %s

  Based on the above information, provide a concise summary of the employee's key strengths and areas for improvement.

  Strengths:

  Areas for Improvement:
  `,
		input.EmployeeID,
		formatFeedback(input.SelfEvaluation),
		formatFeedback(input.ManagerFeedback),
	)

	// TODO: Replace with actual LLM call
	fmt.Println("Prompting LLM with:", prompt)
	// Dummy response for now
	return GeneratePerformanceInsightsOutput{
		Strengths:           "Placeholder strengths",
		AreasForImprovement: "Placeholder areas for improvement",
	}, nil
}

// Helper function to format the feedback maps into strings
func formatFeedback(feedback map[string]string) string {
	var b strings.Builder
	for key, value := range feedback {
		formattedValue := value
		if formattedValue == "" {
			formattedValue = "No feedback provided"
		}
		fmt.Fprintf(&b, "%s: %s
", key, formattedValue)
	}
	return b.String()
}