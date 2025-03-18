import React from "react"
import { X } from 'lucide-react'

export default function Retestscores({ onClose }) {
  const data = [
    {
      answered_at: "Tue, 07 Jan 2025 05:50:20 GMT",
      feedback: "Feedback placeholder",
      model_answer:
        "I want to pursue higher education in the USA because it offers advanced programs and research opportunities that are not available in my home country.",
      predicted_feedback: {
        constructive_feedback:
          "To improve the user answer, they could provide more specific examples of the advanced programs and research opportunities that are not available in their home country. Additionally, they could explain how these opportunities will help them achieve their academic and professional goals.",
        correctness:
          "Partial correctness. While the user answer does mention a valid reason for studying in the USA, it doesn't directly address the question of why they want to study in the USA. The model answer provides a more specific and relevant explanation.",
        grammar:
          "Fair grammar. The sentence structure is simple and clear, but it could be improved by adding more descriptive words to make the answer more engaging.",
        score: 6,
      },
      question: "Why do you want to study in the USA?",
      score: 100,
      user_answer: "Adaptability and problem-solving.",
    },
    {
      answered_at: "Tue, 07 Jan 2025 05:57:38 GMT",
      feedback: "Feedback placeholder",
      model_answer:
        "Yes, I have been accepted by [University Name] to pursue a [Degree Program].",
      predicted_feedback: {
        constructive_feedback:
          "To improve, the user should focus on providing a direct and concise answer to the question. For example: 'Yes, I have been accepted by [University Name] to pursue a [Degree Program].'",
        correctness: "Partially Correct",
        grammar:
          "The user answer lacks proper structure and clarity. It does not directly answer the question 'Have you been accepted by a US institution?' Instead, it mentions adaptability and problem-solving skills.",
        score: 6,
      },
      question: "Have you been accepted by a US institution?",
      score: 100,
      user_answer: "Adaptability and problem-solving.",
    },
    {
      answered_at: "Tue, 07 Jan 2025 05:58:06 GMT",
      feedback: "Feedback placeholder",
      model_answer:
        "I will be studying [Field of Study], which aligns with my career goals and interests.",
      predicted_feedback: {
        constructive_feedback:
          "To improve the answer, the applicant should provide a specific field of study, such as 'Computer Science' or 'Engineering'. Additionally, it would be beneficial to explain how the field of study aligns with their career goals and interests, as mentioned in the model answer.",
        correctness: "Incorrect",
        grammar:
          "The user answer lacks proper sentence structure and clarity. It appears to be a vague statement rather than a specific field of study.",
        score: 2,
      },
      question: "What is your field of study?",
      score: 100,
      user_answer: "Adaptability and problem-solving.",
    },
  ]

  const handleRetest = () => {
    // Mocking navigation
    //console.log("Navigating to dashboard with activeTab: my-interview")
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Retest Scorecard</h1>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close scorecard"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="p-6 space-y-8">
        {data.map((item, index) => (
          <div key={index} className="border-b pb-8 last:border-b-0 last:pb-0">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">Question {index + 1}:</h2>
              <p className="bg-gray-100 p-3 rounded-md text-gray-700">{item.question}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Your Answer:</h3>
                <p className={`p-3 rounded-md ${
                  item.user_answer === "No Answer"
                    ? "bg-red-50 text-red-600"
                    : "bg-blue-50 text-blue-800"
                }`}>
                  {item.user_answer}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Model Answer:</h3>
                <p className="bg-green-50 text-green-800 p-3 rounded-md">{item.model_answer}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border mb-4">
              <h3 className="font-medium text-gray-800 mb-2">Predicted Feedback:</h3>
              <div className="space-y-2">
                <p><span className="font-semibold">Correctness:</span> {item.predicted_feedback.correctness}</p>
                <p><span className="font-semibold">Grammar:</span> {item.predicted_feedback.grammar}</p>
                <p><span className="font-semibold">Constructive Feedback:</span> {item.predicted_feedback.constructive_feedback}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Your Score: <span className="text-blue-600">{item.predicted_feedback.score}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Answered At: {new Date(item.answered_at).toLocaleString()}
                </p>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

