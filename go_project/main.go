package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/a-h/templ"
)

func main() {
	http.HandleFunc("/self-evaluation", selfEvaluationHandler)
	fmt.Println("Server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// Component for rendering the self-evaluation form.
type SelfEvaluationForm struct{}

func (f SelfEvaluationForm) Render(ctx context.Context, w io.Writer) error {
	return templ.ComponentFunc(func(ctx context.Context, w io.Writer) error {
		_, err := w.Write([]byte(`
            <form method="POST" action="/self-evaluation">
                <label for="sme">SME:</label>
                <input type="text" id="sme" name="sme"><br>
                <label for="strategicThinking">Strategic Thinking:</label>
                <input type="text" id="strategicThinking" name="strategicThinking"><br>
                <label for="execution">Execution:</label>
                <input type="text" id="execution" name="execution"><br>
                <label for="communication">Communication:</label>
                <input type="text" id="communication" name="communication"><br>
                <label for="customerFocus">Customer Focus:</label>
                <input type="text" id="customerFocus" name="customerFocus"><br>
                <label for="breadthOfInfluence">Breadth of Influence:</label>
                <input type="text" id="breadthOfInfluence" name="breadthOfInfluence"><br>
                <button type="submit">Submit</button>
            </form>
        `))
		return err
	}).Render(ctx, w)
}

// Component for rendering the form with performance insights.
type SelfEvaluationFormWithInsights struct {
	Insights *GeneratePerformanceInsightsOutput
}

func (f SelfEvaluationFormWithInsights) Render(ctx context.Context, w io.Writer) error {
	return templ.ComponentFunc(func(ctx context.Context, w io.Writer) error {
		_, err := w.Write([]byte(`
            <div>
                <h2>Performance Insights</h2>
                <p><strong>Strengths:</strong> {{ .Insights.Strengths }}</p>
                <p><strong>Areas for Improvement:</strong> {{ .Insights.AreasForImprovement }}</p>
            </div>
        `))
		return err
	}).Render(ctx, w)
}

func selfEvaluationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Render the form
		if err := (SelfEvaluationForm{}).Render(context.Background(), w); err != nil {
			http.Error(w, "Error rendering form", http.StatusInternalServerError)
		}
		return
	}

	// Handle form submission
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error parsing form", http.StatusBadRequest)
		return
	}

	// Extract form values
	input := GeneratePerformanceInsightsInput{
		EmployeeID: "123", // Dummy employee ID
		SelfEvaluation: map[string]string{
			"sme":                r.Form.Get("sme"),
			"strategicThinking":  r.Form.Get("strategicThinking"),
			"execution":          r.Form.Get("execution"),
			"communication":      r.Form.Get("communication"),
			"customerFocus":      r.Form.Get("customerFocus"),
			"breadthOfInfluence": r.Form.Get("breadthOfInfluence"),
		},
		ManagerFeedback: map[string]string{
			"sme":                "Manager feedback for SME",
			"strategicThinking":  "Manager feedback for strategic thinking",
			"execution":          "Manager feedback for execution",
			"communication":      "Manager feedback for communication",
			"customerFocus":      "Manager feedback for customer focus",
			"breadthOfInfluence": "Manager feedback for breadth of influence",
		},
	}

	// Generate performance insights
	insights, err := generatePerformanceInsights(input)
	if err != nil {
		http.Error(w, "Error generating insights", http.StatusInternalServerError)
		return
	}

	// Render the form with insights
	formWithInsights := SelfEvaluationFormWithInsights{Insights: &insights}
	if err := formWithInsights.Render(context.Background(), w); err != nil {
		http.Error(w, "Error rendering form with insights", http.StatusInternalServerError)
	}
}
