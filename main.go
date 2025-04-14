package main

import (
	"fmt"
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
	"strings"

)

func init() {

}
func main() {
	http.HandleFunc("/self-evaluation", selfEvaluationHandler)
	fmt.Println("Server listening on :8081") 
	log.Fatal(http.ListenAndServe(":8081", nil))



// Define roles and levels
const (
	RoleVP       = "VP"
	RoleDirector = "Director"
	RoleManager  = "Manager"
	RoleIC       = "IC"
)
var evaluations = map[string][]Evaluation{}
var icLevels = []string{"IC1", "IC2", "IC3", "IC4", "IC5", "IC6", "IC7", "IC8"}
var managerLevels = []string{"M1", "M2", "M3"}
var directorLevels = []string{"D1", "D2"}

// User represents an employee with their role and level
type User struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Role     string `json:"role"`
	Level    string `json:"level"`
	ReportsTo string `json:"reportsTo"` // ID of the user they report to
}

// Evaluation represents a self-evaluation or feedback
type Evaluation struct {
	UserID             string            `json:"userID"`
	Type               string            `json:"type"` // "self" or "feedback"
	SME                string            `json:"sme"`
	StrategicThinking  string            `json:"strategicThinking"`
	Execution          string            `json:"execution"`
	Communication      string            `json:"communication"`
	CustomerFocus      string            `json:"customerFocus"`
	BreadthOfInfluence string            `json:"breadthOfInfluence"`
}

// In-memory storage for users and evaluations (replace with a database in a real application)
var users = map[string]User{
	"user1": {ID: "user1", Name: "John Doe", Role: RoleIC, Level: icLevels[0]},
	"user2": {ID: "user2", Name: "Jane Smith", Role: RoleManager, Level: managerLevels[0], ReportsTo: "user1"},

}
func main() {
	// Set up log file
	logFile, err := os.OpenFile("ai.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

		
	logFilePath := "ai.log"
	_, err = os.Stat(logFilePath)
	if os.IsNotExist(err) {
		log.Println("Log file does not exist. Creating:", logFilePath)
		_, err := os.Create(logFilePath)
		if err != nil {
			log.Println("Error creating log file:", err)
			panic(err)
		}
		log.Println("Log file created successfully:", logFilePath)
	} else if err != nil {
		log.Println("Error checking for log file:", err)
		panic(err)
	}

	if err != nil {
		log.Fatal(err)
	}
	log.SetOutput(logFile)
	log.Println("Application started.")
	http.HandleFunc("/self-evaluation", selfEvaluationHandler)
	http.HandleFunc("/feedback", feedbackHandler)
	http.HandleFunc("/evaluations/", getEvaluationsHandler) // Added handler to get evaluations
	fmt.Println("Server listening on :8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
} // Render the self-evaluation form as plain HTML.
func renderSelfEvaluationForm(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	tmpl, err := template.ParseFiles("templates/self_evaluation_form.html")

	if err != nil {
		log.Println("Error parsing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, nil)

	if err != nil {
		log.Println("Error executing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}

func selfEvaluationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Render the form
		renderSelfEvaluationForm(w)
		return
	}

	// Handle form submission
	var eval Evaluation
	if err := json.NewDecoder(r.Body).Decode(&eval); err != nil {
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	eval.Type = "self"	
	
	if eval.UserID == "" || eval.SME == "" || eval.StrategicThinking == "" || eval.Execution == "" || eval.Communication == "" || eval.CustomerFocus == "" || eval.BreadthOfInfluence == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}



	// Store the evaluation
	evaluations[eval.UserID] = append(evaluations[eval.UserID], eval)

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Self-evaluation submitted successfully"))


func feedbackHandler(w http.ResponseWriter, r *http.Request) {
	userID := strings.TrimPrefix(r.URL.Path, "/feedback/")

	if r.Method == http.MethodGet {
		// Get the user
		user, ok := users[userID]
		if !ok {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}

		// Get the user's self-evaluation
		var selfEval Evaluation
		for _, eval := range evaluations[userID] {
			if eval.Type == "self" {
				selfEval = eval
				break
			}
		}

		renderFeedbackForm(w, userID, user.Name, selfEval)
		return
	}
}	
	
}

func getEvaluationsHandler(w http.ResponseWriter, r *http.Request) {
	// Get the user ID from the URL path
	userID := r.URL.Path[len("/evaluations/":)]

	// Get the user making the request (for authorization)
	requestingUserID := "someUser" // Replace with actual authentication
	requestingUser, ok := users[requestingUserID]

	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Check if the requesting user is allowed to access the evaluations
	if requestingUser.Role != RoleManager && requestingUser.ID != userID {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	// If the requesting user is a manager, check if the user whose evaluations are being requested is their direct report
	if requestingUser.Role == RoleManager {
		evaluatedUser, ok := users[userID]
		if !ok || evaluatedUser.ReportsTo != requestingUserID {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		}
	}

	// Get the evaluations for the user
	evalList, ok := evaluations[userID]

	if !ok {
		evalList = []Evaluation{}
	}

	// Return the evaluations as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(evalList)
}

func renderFeedbackForm(w http.ResponseWriter, userID string, userName string, selfEval Evaluation) {
	w.Header().Set("Content-Type", "text/html")
	tmpl, err := template.ParseFiles("templates/feedback_form.html")
	if err != nil {
		log.Println("Error parsing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	data := map[string]interface{}{
		"userID":   userID,
		"userName": userName,
		"selfEval": selfEval,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		log.Println("Error executing template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}