package main

import (
	"fmt"
	"encoding/json"
	"html/template"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/self-evaluation", selfEvaluationHandler)
	fmt.Println("Server listening on :8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}

// Render the self-evaluation form as plain HTML.
func renderSelfEvaluationForm(w http.ResponseWriter) {	
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	tmpl, err := template.ParseFiles("go_project/templates/self_evaluation_form.html")

	// Correct the template file path.
	tmpl, err := template.ParseFiles("./templates/self_evaluation_form.html")
	if err != nil {
		log.Println("Error parsing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Execute the template without any dynamic data.
	if err := tmpl.Execute(w, nil); err != nil {
		log.Println("Error executing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

// Handle the self-evaluation form submission.
func selfEvaluationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Render the form for GET requests.
		renderSelfEvaluationForm(w)
		return
	}

	// Handle form submission
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error parsing form", http.StatusBadRequest)
		return
	}

	// Validate form fields
	requiredFields := []string{"sme", "strategicThinking", "execution", "communication", "customerFocus", "breadthOfInfluence"}

	for _, field := range requiredFields {
		if r.Form.Get(field) == "" {
			http.Error(w, fmt.Sprintf("Missing required field: %s", field), http.StatusBadRequest)
			return
		}
	}

	input := GeneratePerformanceInsightsInput{
		EmployeeID: "123", // Dummy employee ID - will be replaced later
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

	// Render the insights
	renderInsights(w, insights)
}

func renderInsights(w http.ResponseWriter, insights GeneratePerformanceInsightsOutput) {
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	tmpl, err := template.ParseFiles("go_project/templates/performance_insights.html")

	if err != nil {
		log.Println("Error parsing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, insights)

	if err != nil {
		log.Println("Error executing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}
