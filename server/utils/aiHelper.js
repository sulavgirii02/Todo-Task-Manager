// =============================================
// aiHelper.js - Simple AI Task Analyzer
// =============================================
// This is our "AI" module! It doesn't use machine learning.
// Instead, it uses keyword matching to automatically
// detect the priority and category of a task.
//
// HOW IT WORKS:
// 1. Takes the task title as input
// 2. Converts it to lowercase for easier matching
// 3. Checks for specific keywords
// 4. Returns a suggested priority and category
//
// EXAMPLE:
//   Input:  "Finish internship assignment tomorrow"
//   Output: { priority: "High", category: "Work" }
//
//   Input:  "Buy groceries"
//   Output: { priority: "Low", category: "Personal" }

// ---- KEYWORD LISTS ----
// These arrays contain words that help us identify priority and category

// High priority keywords - tasks that are urgent or time-sensitive
const highPriorityKeywords = [
  "urgent",
  "asap",
  "tomorrow",
  "deadline",
  "important",
  "critical",
  "immediately",
  "today",
  "tonight",
  "rush",
  "emergency",
  "due",
  "overdue",
  "final",
];

// Low priority keywords - tasks that are not urgent
const lowPriorityKeywords = [
  "sometime",
  "later",
  "whenever",
  "maybe",
  "eventually",
  "someday",
  "no rush",
  "low priority",
  "when free",
  "casual",
  "optional",
];

// Category keywords - maps keywords to their category
const categoryKeywords = {
  Work: [
    "assignment",
    "meeting",
    "report",
    "work",
    "project",
    "presentation",
    "client",
    "office",
    "boss",
    "colleague",
    "deadline",
    "internship",
    "job",
    "email",
    "conference",
    "task",
    "submit",
  ],
  Personal: [
    "groceries",
    "cook",
    "clean",
    "laundry",
    "shopping",
    "buy",
    "home",
    "family",
    "friend",
    "birthday",
    "gift",
    "party",
    "dinner",
    "lunch",
    "breakfast",
    "pay bills",
    "rent",
  ],
  Education: [
    "study",
    "exam",
    "homework",
    "read",
    "learn",
    "course",
    "class",
    "lecture",
    "tutorial",
    "quiz",
    "test",
    "research",
    "book",
    "notes",
    "practice",
    "school",
    "college",
    "university",
  ],
  Health: [
    "gym",
    "exercise",
    "run",
    "walk",
    "workout",
    "doctor",
    "medicine",
    "yoga",
    "meditate",
    "sleep",
    "diet",
    "health",
    "fitness",
    "jog",
    "swim",
    "stretch",
  ],
};

// ---- MAIN AI FUNCTION ----
// This function analyzes a task title and returns suggestions

function analyzeTask(title) {
  // Step 1: Convert the title to lowercase so matching is case-insensitive
  // "Buy GROCERIES" becomes "buy groceries"
  const lowerTitle = title.toLowerCase();

  // Step 2: Detect Priority
  let priority = "Medium"; // Default priority

  // Check if any high priority keyword is found in the title
  for (let i = 0; i < highPriorityKeywords.length; i++) {
    if (lowerTitle.includes(highPriorityKeywords[i])) {
      priority = "High";
      break; // Stop checking once we find a match
    }
  }

  // Only check low priority if we didn't already find high priority
  if (priority !== "High") {
    for (let i = 0; i < lowPriorityKeywords.length; i++) {
      if (lowerTitle.includes(lowPriorityKeywords[i])) {
        priority = "Low";
        break;
      }
    }
  }

  // Step 3: Detect Category
  let category = "General"; // Default category

  // Check each category's keywords
  // Object.keys gives us ["Work", "Personal", "Education", "Health"]
  const categories = Object.keys(categoryKeywords);

  for (let i = 0; i < categories.length; i++) {
    const categoryName = categories[i];
    const keywords = categoryKeywords[categoryName];

    // Check if any keyword from this category is in the title
    for (let j = 0; j < keywords.length; j++) {
      if (lowerTitle.includes(keywords[j])) {
        category = categoryName;
        break;
      }
    }

    // Stop if we already found a category
    if (category !== "General") {
      break;
    }
  }

  // Step 4: Return the results
  return {
    priority: priority,
    category: category,
  };
}

// Export the function so other files can use it
module.exports = { analyzeTask };
