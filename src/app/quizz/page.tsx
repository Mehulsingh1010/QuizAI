"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";

const questions = [
  {
    questionText: "What is JavaScript?",
    answers: [
      {
        answerText: "A programming language used to create dynamic web content",
        isCorrect: true,
        id: 1,
      },
      { answerText: "A type of database", isCorrect: false, id: 2 },
      { answerText: "A styling language for websites", isCorrect: false, id: 3 },
      { answerText: "A server-side framework", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What does CSS stand for?",
    answers: [
      {
        answerText: "Cascading Style Sheets",
        isCorrect: true,
        id: 1,
      },
      { answerText: "Computer Styling Syntax", isCorrect: false, id: 2 },
      { answerText: "Creative Style System", isCorrect: false, id: 3 },
      { answerText: "Cascading Script Syntax", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is an API?",
    answers: [
      {
        answerText: "A set of tools and protocols for building software",
        isCorrect: true,
        id: 1,
      },
      { answerText: "A programming language", isCorrect: false, id: 2 },
      { answerText: "A type of web server", isCorrect: false, id: 3 },
      { answerText: "A data storage system", isCorrect: false, id: 4 },
    ],
  },
];


export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }

    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answer: { answerText?: string; isCorrect: any; id: any; }) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
    }
    setIsCorrect(isCurrentCorrect);
  };

  const previous = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setCurrentQuestion(currentQuestion);
    }
  };

  return (
    <div className="flex flex-col flex-1 ">
      <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
          <Button onClick={previous} size="icon" variant="outline">
            <ChevronLeft />
          </Button>
          <ProgressBar value={(currentQuestion / questions.length) * 100} />
          <Button size="icon" variant="outline">
            <X />
          </Button>
        </header>
      </div>
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-bold">Hello Worldd👋</h1>
        ) : (
          <div className="">
            <h2 className="text-3xl font-bold">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {questions[currentQuestion].answers.map((answer) => {
                const isSelected = selectedAnswer === answer.id;
                const buttonColor = isSelected
                  ? answer.isCorrect
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-secondary";

                return (
                  <Button
                    key={answer.id}
                    className={buttonColor}
                    variant={"secondary"}
                    onClick={() => handleAnswer(answer)}
                  >
                    {answer.answerText}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <ResultCard
          isCorrect={isCorrect}
          correctAnswer={
            questions[currentQuestion].answers.find(
              (answer) => answer.isCorrect === true
            )?.answerText
          }
        ></ResultCard>
        <Button variant="neo" onClick={handleNext}>
          {!started ? "Start" :(currentQuestion===questions.length -1) ? "Submit":"Next"}
        </Button>
      </footer>
    </div>
  );
}
