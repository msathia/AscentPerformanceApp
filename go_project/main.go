package main


import (
	"context"
	"fmt"
	"net/http"


	"github.com/a-h/templ"
)

func main() {
	http.HandleFunc("/self-evaluation", selfEvaluationHandler)

	fmt.Println("Server listening on :8080")
	http.ListenAndServe(":8080", nil)
}

func selfEvaluationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Render the form
		SelfEvaluationForm().Render(r.Context(), w)
		return
	}

	// Process form submission
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error parsing form", http.StatusBadRequest)
		return
	}

	sme := r.Form.Get("sme")
	strategicThinking := r.Form.Get("strategicThinking")
	execution := r.Form.Get("execution")
	communication := r.Form.Get("communication")
	customerFocus := r.Form.Get("customerFocus")
	breadthOfInfluence := r.Form.Get("breadthOfInfluence")

	input := GeneratePerformanceInsightsInput{
		EmployeeID: "123", // Dummy employee ID
		SelfEvaluation: map[string]string{
			"sme":                 sme,
			"strategicThinking": strategicThinking,
			"execution":           execution,
			"communication":     communication,
			"customerFocus":     customerFocus,
			"breadthOfInfluence": breadthOfInfluence,
		},
		ManagerFeedback: map[string]string{
			"sme":                 "Manager feedback for SME",                 
			"strategicThinking": "Manager feedback for strategic thinking", 
			"execution":           "Manager feedback for execution",           
			"communication":     "Manager feedback for communication",     
			"customerFocus":     "Manager feedback for customer focus",     
			"breadthOfInfluence": "Manager feedback for breadth of influence", 
		},
	}

	insights, err := generatePerformanceInsights(r.Context(), input)
	if err != nil {
		http.Error(w, "Error generating insights", http.StatusInternalServerError)
		return
	}

	// Re-render the form with insights
	renderSelfEvaluationForm(w, r, &insights)
}

func renderSelfEvaluationForm(w http.ResponseWriter, r *http.Request, insights *GeneratePerformanceInsightsOutput) {
	err := SelfEvaluationFormWithInsights(insights).Render(r.Context(), w)
	if err != nil {
		http.Error(w, "Error rendering template", http.StatusInternalServerError)
		return
	}
	fmt.Println("")
}

// New templ component to include insights



templ SelfEvaluationFormWithInsights(insights *GeneratePerformanceInsightsOutput) {
	@SelfEvaluationForm()
	if insights != nil {
		<div>
			<h2>Performance Insights</h2>
			<p><strong>Strengths:</strong> { insights.Strengths }</p>
			<p><strong>Areas for Improvement:</strong> { insights.AreasForImprovement }</p>
		</div>
	}
}