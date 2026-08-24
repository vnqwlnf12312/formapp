"use client";

import { useMemo, useState } from "react";

type Question = {
  question: string;
  eyebrow: string;
  answers: string[];
  correct: number;
  note: string;
};

// Замените эти примеры на свои вопросы и ответы.
const questions: Question[] = [
  {
    eyebrow: "Раздел I · Базовые сведения",
    question: "Как выглядит идеальный совместный вечер?",
    answers: [
      "Ужин и долгий разговор",
      "Каждый смотрит в свой телефон",
      "Спор о том, кто выбирает фильм",
    ],
    correct: 0,
    note: "Верно. Уют и внимание друг к другу — отличный фундамент.",
  },
  {
    eyebrow: "Раздел II · Особые обстоятельства",
    question: "Что делать, если девушка говорит: «Всё нормально»?",
    answers: [
      "Поверить и уйти играть",
      "Обнять и спокойно спросить ещё раз",
      "Начать доказывать, что она неправа",
    ],
    correct: 1,
    note: "Точно. Немного заботы и терпения решают почти всё.",
  },
  {
    eyebrow: "Раздел III · Финальная проверка",
    question: "Главное условие хороших отношений — это…",
    answers: [
      "Уметь читать мысли",
      "Никогда не спорить",
      "Слышать, уважать и поддерживать друг друга",
    ],
    correct: 2,
    note: "Идеально. Заявление почти одобрено.",
  },
];

export default function Home() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;
  const applicationNumber = useMemo(
    () => String(new Date().getDate()).padStart(2, "0") + "–LOVE",
    [],
  );

  const chooseAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.correct) setScore((value) => value + 1);
  };

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setStarted(false);
    setFinished(false);
    setCurrent(0);
    setSelected(null);
    setScore(0);
  };

  return (
    <main className="page-shell">
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />

      <section className="application-card" aria-live="polite">
        <header className="topbar">
          <div className="brand-mark" aria-hidden="true">Л</div>
          <div>
            <p className="kicker">Личное дело</p>
            <p className="document-id">Заявление № {applicationNumber}</p>
          </div>
          <span className="stamp">серьёзно<br />и нежно</span>
        </header>

        {!started ? (
          <div className="intro view-enter">
            <span className="section-number">01</span>
            <p className="eyebrow">Особо важная форма</p>
            <h1>Подача заявления<br />для девушки</h1>
            <p className="lede">
              Небольшая проверка на внимательность, совместимость и умение
              выбирать правильные ответы.
            </p>

            <label className="name-field">
              <span>Имя заявителя</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Как к вам обращаться?"
                autoComplete="name"
              />
            </label>

            <button
              className="primary-button"
              type="button"
              onClick={() => setStarted(true)}
              disabled={!name.trim()}
            >
              Подать заявление
              <span aria-hidden="true">→</span>
            </button>

            <div className="fine-print">
              <span>Срок рассмотрения: 2 минуты</span>
              <span>Пошлина: одна улыбка</span>
            </div>
          </div>
        ) : finished ? (
          <div className="result view-enter">
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <i key={index} style={{ "--i": index } as React.CSSProperties} />
              ))}
            </div>
            <div className="approval-seal" aria-hidden="true">Одобрено</div>
            <p className="eyebrow">Решение принято</p>
            <h1>{name}, заявление<br />рассмотрено</h1>
            <p className="result-score">
              <strong>{score}</strong><span>из {questions.length}</span>
            </p>
            <p className="lede result-copy">
              {score === questions.length
                ? "Все ответы совпали. Кажется, это судьба — или очень хорошая подготовка."
                : "Есть над чем поработать, но симпатия уже на вашей стороне."}
            </p>
            <button className="primary-button" type="button" onClick={restart}>
              Заполнить ещё раз
              <span aria-hidden="true">↻</span>
            </button>
          </div>
        ) : (
          <div className="quiz view-enter" key={current}>
            <div className="progress-row">
              <span>Вопрос {current + 1} из {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-track" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>

            <p className="eyebrow">{question.eyebrow}</p>
            <h2>{question.question}</h2>

            <div className="answers" role="group" aria-label={question.question}>
              {question.answers.map((answer, index) => {
                const isSelected = selected === index;
                const isCorrect = index === question.correct;
                const state = selected === null
                  ? ""
                  : isCorrect
                    ? "correct"
                    : isSelected
                      ? "wrong"
                      : "muted";

                return (
                  <button
                    className={`answer ${state}`}
                    key={answer}
                    type="button"
                    onClick={() => chooseAnswer(index)}
                    disabled={selected !== null}
                  >
                    <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                    <span>{answer}</span>
                    {selected !== null && isCorrect && (
                      <span className="answer-icon" aria-label="Верно">✓</span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="answer-icon" aria-label="Неверно">×</span>
                    )}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className={`feedback ${selected === question.correct ? "good" : "bad"}`}>
                <span className="feedback-title">
                  {selected === question.correct ? "Ответ принят" : "Не совсем"}
                </span>
                <p>
                  {selected === question.correct
                    ? question.note
                    : `Правильный ответ: «${question.answers[question.correct]}».`}
                </p>
              </div>
            )}

            <button
              className="primary-button next-button"
              type="button"
              onClick={nextQuestion}
              disabled={selected === null}
            >
              {current === questions.length - 1 ? "Получить решение" : "Следующий вопрос"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>

      <p className="footer-note">Конфиденциально · Сделано с вниманием</p>
    </main>
  );
}
