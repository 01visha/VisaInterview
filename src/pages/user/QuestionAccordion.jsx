import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Volume2, StopCircle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const QuestionAccordion = ({ questions }) => {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const [openIndex, setOpenIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null); // Track which question is being spoken
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel(); // Stop speaking when component unmounts
    };
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleAll = () => {
    if (openIndex === null) {
      setOpenIndex("all");
    } else {
      setOpenIndex(null);
    }
  };

  const readAloud = (text, index) => {
    if (speakingIndex === index) {
      // If the same question is clicked again, stop speaking
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const foreignVoice =
      voices.find((voice) => voice.lang.includes("en-GB")) || voices[0];
    if (foreignVoice) {
      utterance.voice = foreignVoice;
    }
    utterance.rate = 1;

    utterance.onend = () => {
      setSpeakingIndex(null); // Reset speaking index when speech ends
    };

    setSpeakingIndex(index); // Set the current speaking index
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 flex justify-start">
        <button
          onClick={toggleAll}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
          title={openIndex === "all" ? "Collapse All" : "Expand All"}
        >
          {openIndex === "all" ? "Collapse All" : "Expand All"}
          <FontAwesomeIcon icon={openIndex === "all" ? faMinus : faPlus} />
        </button>
      </div>

      {safeQuestions.map((item, index) => (
        <div key={index} className="border-b last:border-b-0">
          <button
            className="w-full px-6 py-2 text-left focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center justify-between w-full h-full">
              <h2 className="text-lg font-medium text-gray-800">
                Question {index + 1} :{" "}
                <span className="text-gray-700">{item.question}</span>
              </h2>
              {openIndex === index || openIndex === "all" ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </button>
          {(openIndex === index || openIndex === "all") && (
            <div className="px-6 pb-2">
              <div className="mt-2">
                <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                  Model Answer
                  <button
                    onClick={() => readAloud(item.model_answer, index)}
                    className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Read aloud model answer"
                  >
                    {speakingIndex === index ? ( // Only show stop icon for the active question
                      <StopCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                </h3>
                <p className="bg-green-50 text-green-800 p-3 rounded-md">
                  {item.model_answer}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionAccordion;