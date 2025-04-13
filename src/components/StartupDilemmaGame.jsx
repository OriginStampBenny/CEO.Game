import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const scenarios = [
  {
    id: 1,
    title: "Runde 1 – Die schnelle Abkürzung",
    description:
      "Ein Investor bietet 2 Mio. CHF – aber nur, wenn ihr Kundendaten für Marketing analysiert, ohne die Kunden zu informieren.",
    choices: [
      {
        label: "A) Deal annehmen.",
        effect: "Reputation -1, Finanzen +2, Moral -1",
        score: { finance: 2, ethics: -1, morale: -1 },
      },
      {
        label: "B) Nachverhandeln.",
        effect: "Reputation +1, Finanzen 0, Moral +1",
        score: { finance: 0, ethics: 1, morale: 1 },
      },
      {
        label: "C) Ablehnen.",
        effect: "Reputation +2, Finanzen -1, Moral +2",
        score: { finance: -1, ethics: 2, morale: 2 },
      },
    ],
  },
  // Weitere Szenarien können hier ergänzt werden
];

export default function StartupDilemmaGame() {
  const [round, setRound] = useState(0);
  const [log, setLog] = useState([]);
  const [finance, setFinance] = useState(0);
  const [ethics, setEthics] = useState(0);
  const [morale, setMorale] = useState(0);

  const handleChoice = (choice) => {
    setLog([
      ...log,
      {
        round: scenarios[round].title,
        choice: choice.label,
        effect: choice.effect,
      },
    ]);
    setFinance(finance + choice.score.finance);
    setEthics(ethics + choice.score.ethics);
    setMorale(morale + choice.score.morale);
    setRound(round + 1);
  };

  const restartGame = () => {
    setRound(0);
    setLog([]);
    setFinance(0);
    setEthics(0);
    setMorale(0);
  };

  const isGameOver = () => {
    return morale <= -3 || ethics <= -3;
  };

  const isWinner = () => {
    return (
      round === scenarios.length &&
      finance >= 5 &&
      ethics >= 5 &&
      morale >= 3
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          CEO Survival – Das Startup-Dilemma
        </h1>
        <p className="text-sm text-gray-500">
          Simulation mit ChatGPT, entwickelt von OriginStamp – Benny
        </p>
      </div>

      {round < scenarios.length && !isGameOver() ? (
        <Card className="mb-4">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">
              {scenarios[round].title}
            </h2>
            <p>{scenarios[round].description}</p>
            <div className="space-y-2">
              {scenarios[round].choices.map((choice, idx) => (
                <Button
                  key={idx}
                  className="w-full"
                  onClick={() =>
