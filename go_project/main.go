package main

import (
	"github.com/a-h/templ"
	"context"
	"fmt"
	"log"
	"net/http"
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

func main() {
	http.HandleFunc("/self-evaluation", selfEvaluationHandler)

	fmt.Println("Server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// Placeholder for SelfEvaluationForm
templ SelfEvaluationForm() {
    <form>Placeholder Self Evaluation Form</form>
}


func selfEvaluationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Render the form
		SelfEvaluationForm().Render(context.Background(), w)
		return
	}

	// Process form submission
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error parsing form", http.StatusBadRequest)
		return
	}

	// Extract form values
	input := GeneratePerformanceInsightsInput{
		EmployeeID: "123", // Dummy employee ID
		SelfEvaluation: map[string]string{
			"sme":                 r.Form.Get("sme"),
			"strategicThinking":   r.Form.Get("strategicThinking"),
			"execution":           r.Form.Get("execution"),
			"communication":       r.Form.Get("communication"),
			"customerFocus":       r.Form.Get("customerFocus"),
			"breadthOfInfluence":  r.Form.Get("breadthOfInfluence"),
		},
		ManagerFeedback: map[string]string{
			"sme":                 "Manager feedback for SME",
			"strategicThinking":   "Manager feedback for strategic thinking",
			"execution":           "Manager feedback for execution",
			"communication":       "Manager feedback for communication",
			"customerFocus":       "Manager feedback for customer focus",
			"breadthOfInfluence":  "Manager feedback for breadth of influence",
		},
	}

	// Generate performance insights
	insights, err := generatePerformanceInsights(context.Background(), input)
	if err != nil {
		http.Error(w, "Error generating insights", http.StatusInternalServerError)
		return
	}

	// Re-render the form with insights
	renderSelfEvaluationForm(w, r, &insights)
}

func renderSelfEvaluationForm(w http.ResponseWriter, r *http.Request, insights *GeneratePerformanceInsightsOutput) {
	if insights == nil {
		http.Error(w, "No insights available", http.StatusInternalServerError)
		return
	}

	err := selfEvaluationFormWithInsights(insights).Render(context.Background(), w)
	if err != nil {
		log.Printf("Error rendering self-evaluation form: %v", err)
		http.Error(w, "Error rendering template", http.StatusInternalServerError)
		return
	}
}

// Define the templ component to include insights
templ selfEvaluationFormWithInsights(insights *GeneratePerformanceInsightsOutput) {
	{! SelfEvaluationForm() }
	if insights != nil {
		<div>
			<h2>Performance Insights</h2>
			<p><strong>Strengths:</strong> { insights.Strengths }</p>
			<p><strong>Areas for Improvement:</strong> { insights.AreasForImprovement }</p>
		</div>
	}
}

func generatePerformanceInsights(ctx context.Context, input GeneratePerformanceInsightsInput) (GeneratePerformanceInsightsOutput, error) {
	// Replace this with actual logic to generate performance insights.
	return GeneratePerformanceInsightsOutput{
		Strengths:           "Placeholder Strengths",
		AreasForImprovement: "Placeholder Areas for Improvement",
	}, nil
}
