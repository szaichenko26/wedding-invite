import './App.scss';
import {useEffect, useState} from "react";

const questions = [
  {
    text: 'Знакомы ли вы сo Стасом и Женей?',
    options: [
      { key: 'yes', value: 'Конечно' },
      { key: 'no', value: 'Не знаю таких' },
    ]
  },
  {
    text: 'Любите ли вы весело проводить время?',
    options: [
      { key: 'yes', value: 'Конечно' },
      { key: 'no', value: 'Не очень' },
    ]
  },
  {
    text: 'Согласны, что расстояние не является помехой?',
    options: [
      { key: 'yes', value: 'Конечно' },
      { key: 'no', value: 'Лучше дома' },
    ]
  },
];

const links = {
  vlad: 'https://vsa-media.s3.amazonaws.com/vlad.pdf',
  tema: 'https://vsa-media.s3.amazonaws.com/tema.pdf',
  vera: 'https://vsa-media.s3.amazonaws.com/vera.pdf',
}

function App() {
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(false);
  const [name, setName] = useState('vlad');

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    const name = sp.get('name');
    if (name) setName(name);
  }, []);

  const handleChange = (key) => {
    setChecked(key.target.value);
    if (key.target.value === 'yes') {
      setError(null);
      setTimeout(() => {
        if (index === 2) {
          setResult(true);
        } else {
          key.target.blur();
          setIndex((prev) => prev + 1);
          setChecked(null);
        }
      }, 1500);
    } else {
      setError('Ответ неверный! Подумай хорошо!');
    }
  }

  const question = questions[index];
  const link = links[name];

  return (
    <div className="card">
      {result ? (
        <>
          <h2 className="title">Вы показали свое желание разделить с нами важное событие!</h2>
          <a className="link" href={link}>Открыть приглашение</a>
        </>
      ) : (
        <>
          <h2 className="title">{question.text}</h2>
          <p className="error">{error}</p>
          <ul>
            {question.options.map((it) => (
              <li key={it.key}>
                <input type="radio"
                onChange={handleChange}
                value={it.key}
                id={it.key}
                checked={it.value === checked}/>
                <label htmlFor={it.key}>
                  <span className="outer">
                    <span className="inner">
                    </span>
                  </span>
                  <p className="inlet">
                    <span className="text__effect">{it.value}</span>
                  </p>
                </label>
              </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
