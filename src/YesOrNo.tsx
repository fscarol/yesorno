import { useState } from 'react';

import './YesOrNo.css';

const API_URL = 'https://yesno.wtf/api';

export default function YesOrNo() {
  const answerText = document.querySelector('#answer');
  const answerBox = document.querySelector('#answerBox');
  const questionEl = document.querySelector('#question');
  const [isBtnEnabled, setBtnEnabled] = useState(true);

  async function fetchAnswer() {
    if (
      !answerText ||
      !answerBox ||
      !questionEl ||
      (questionEl as HTMLInputElement).value === ''
    )
      return;
    answerBox.classList.remove('before:bg-green-500', 'before:bg-red-800');

    answerText.textContent = '...';
    setBtnEnabled(false);

    await fetch(API_URL).then((response) => {
      if (!response.ok) {
        answerText.textContent = 'Dunno';
      }
      response.json().then((data) => {
        answerText.textContent = data.answer;

        if (data.answer === 'yes') {
          answerBox.classList.add('before:bg-green-500');
        } else if (data.answer === 'no') {
          answerBox.classList.add('before:bg-red-800');
        }
      });
      clearAnswer();
      setBtnEnabled(true);
    });
  }

  function clearAnswer() {
    if (!answerText || !answerBox) return;
    setTimeout(() => {
      if (answerText) {
        answerBox.classList.remove('before:bg-green-500', 'before:bg-red-800');
        answerText.textContent = '';
      }
    }, 5000);
  }

  // interface AnswerData {
  //   answer: string;
  // }

  function handleKeyEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      fetchAnswer();
    }
  }

  return (
    <main className="flex justify-center items-center flex-col gap-4 bg-linear-to-b from-slate-400 to-neutral-700 h-screen text-red-50 font-display">
      <h1 className="text-4xl">Ask me something</h1>
      <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
        <input
          className="border-2 border-red-50 rounded px-2 py-1 focus:outline-hidden font-sans"
          id="question"
          type="text"
          onKeyDown={handleKeyEnter}
        />
        <button
          onClick={fetchAnswer}
          disabled={!isBtnEnabled}
          className="border-2 border-red-50 rounded px-3 cursor-pointer hover:bg-slate-300 hover:text-slate-800 text-3xl">
          ?
        </button>
      </form>

      <span
        className="text-4xl relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3"
        id="answerBox">
        <span className="relative text-white" id="answer"></span>
      </span>
    </main>
  );
}
