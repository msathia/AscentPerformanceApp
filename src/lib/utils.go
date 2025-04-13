package utils

import (
	"strings"
)

// Cn merges CSS class names.  It takes a variable number of strings as arguments
// and returns a single string with the class names separated by spaces.
// Empty strings are ignored.
func Cn(inputs ...string) string {
	var result strings.Builder
	for _, input := range inputs {
		if input != "" {
			if result.Len() > 0 {
				result.WriteString(" ")
			}
			result.WriteString(input)
		}
	}
	return result.String()
}