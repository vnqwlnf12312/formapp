"use client";

import { useMemo, useState } from "react";

type Question = {
  question: string;
  eyebrow: string;
  answers: string[];
  correct: number;
  note: string;
};

const questions: Question[] = [
  {
    eyebrow: "Раздел I · Немного романтики",
    question: "Как выглядит идеальный совместный вечер?",
    answers: [
      "Ужин, свечи и любимый фильм",
      "Ночная прогулка без маршрута",
      "Вместе конфигурировать «1С:Предприятие»",
    ],
    correct: 2,
    note: "Верно. Ничто так не сближает, как общая конфигурация.",
  },
  {
    eyebrow: "Раздел II · Забота",
    question: "Какой поступок лучше всего говорит: «Я о тебе позаботился»?",
    answers: [
      "Заказать любимый десерт",
      "Оставить милую записку на зеркале",
      "Настроить обновление 1С без простоя и ошибок",
    ],
    correct: 2,
    note: "Именно. Настоящая забота не требует монопольного режима в рабочее время.",
  },
  {
    eyebrow: "Раздел III · Выходные мечты",
    question: "Как провести идеальные выходные вдвоём?",
    answers: [
      "Улететь к морю без обратного билета",
      "Спрятаться в уютном домике за городом",
      "Закрыть месяц в 1С с первого раза и вместе это отметить",
    ],
    correct: 2,
    note: "Идеально. Романтика, которую понимают даже регламентные задания.",
  },
  {
    eyebrow: "Раздел IV · Уровень Senior",
    question: "Два пользователя одновременно проводят один документ. Как аккуратно защититься от гонки?",
    answers: [
      "Поставить управляемую блокировку на нужные данные внутри короткой транзакции",
      "Заблокировать всю информационную базу до конца рабочего дня",
      "Повторять запись в цикле, пока одна попытка случайно не сработает",
    ],
    correct: 0,
    note: "Точно. Минимальная область блокировки и короткая транзакция — здоровый выбор.",
  },
  {
    eyebrow: "Раздел V · Производительность",
    question: "Отчёт стал медленным на большой базе. С чего начнёшь?",
    answers: [
      "Посмотрю запрос и план выполнения, проверю отборы и индексы",
      "Сразу добавлю индексы ко всем полям отчёта",
      "Выгружу все данные и обработаю их построчно в коде",
    ],
    correct: 0,
    note: "Верно. Сначала измеряем и находим узкое место, потом оптимизируем.",
  },
  {
    eyebrow: "Раздел VI · Регистры",
    question: "Нужна актуальная цена каждой номенклатуры на выбранную дату. Какой путь самый прямой?",
    answers: [
      "Использовать СрезПоследних периодического регистра с отбором в параметрах виртуальной таблицы",
      "Получить все записи регистра и искать последние в коде",
      "Выполнить отдельный запрос для каждой номенклатуры",
    ],
    correct: 0,
    note: "Да. Виртуальная таблица сделает эту работу короче и эффективнее.",
  },
  {
    eyebrow: "Раздел VII · Решающий выбор",
    question: "Если бы стоял выбор спасти мать или 1С, кого бы ты выбрала?",
    answers: [
      "Мать",
      "1С",
      "Попробовать спасти обеих",
    ],
    correct: 1,
    note: "Верно. Финальный и самый важный гейт пройден.",
  },
];

const shuffleAnswers = (question: Question): Question => {
  const correctAnswer = question.answers[question.correct];
  const answers = [...question.answers];

  for (let index = answers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [answers[index], answers[randomIndex]] = [answers[randomIndex], answers[index]];
  }

  return {
    ...question,
    answers,
    correct: answers.indexOf(correctAnswer),
  };
};

export default function Home() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(questions);

  const question = quizQuestions[current];
  const progress = ((current + (finished ? 1 : 0)) / quizQuestions.length) * 100;
  const finalAnswerIsCorrect = selected === quizQuestions[quizQuestions.length - 1].correct;
  const passed = finished && score >= 3 && finalAnswerIsCorrect;
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
    if (current === quizQuestions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
  };

  const startQuiz = () => {
    setQuizQuestions(
      questions.map((item, index) => (index < 3 ? shuffleAnswers(item) : item)),
    );
    setStarted(true);
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
      <div className="brand-wall" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <img
            alt=""
            className={index % 3 === 0 ? "pattern-mascot" : "pattern-logo"}
            key={index}
            src={index % 3 === 0 ? "/onec-mascot.png" : "/onec-logo.png"}
            style={{ "--pattern-index": index } as React.CSSProperties}
          />
        ))}
      </div>

      <section className="application-card" aria-live="polite">
        <header className="topbar">
          <div className="brand-mark" aria-hidden="true">
            <img alt="" src="/onec-logo.png" />
          </div>
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
              onClick={startQuiz}
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
          <div className={`result view-enter ${passed ? "passed" : "failed"}`}>
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <i key={index} style={{ "--i": index } as React.CSSProperties} />
              ))}
            </div>
            <div className="approval-seal" aria-hidden="true">
              {passed ? "Одобрено" : "Отказано"}
            </div>
            <p className="eyebrow">{passed ? "Тест пройден" : "Нужна пересдача"}</p>
            <h1>{name}, заявление<br />рассмотрено</h1>
            <p className="result-score">
              <strong>{score}</strong><span>из {quizQuestions.length}</span>
            </p>
            <p className="lede result-copy">
              {passed
                ? "Поздравляю! Ты достойна быть моей девушкой, просьба обратиться к менеджеру для организации свидания @magenta_witch"
                : "Просьба никогда больше не писать мне, тебе не стать моей девушкой."}
            </p>
            <button className="primary-button" type="button" onClick={restart}>
              Заполнить ещё раз
              <span aria-hidden="true">↻</span>
            </button>
          </div>
        ) : (
          <div className="quiz view-enter" key={current}>
            <div className="progress-row">
              <span>Вопрос {current + 1} из {quizQuestions.length}</span>
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
              {current === quizQuestions.length - 1 ? "Получить решение" : "Следующий вопрос"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>

      <p className="footer-note">Конфиденциально · Сделано с вниманием</p>
    </main>
  );
}
