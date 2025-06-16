import { useState, useEffect } from 'react';
import styles from './TranslateWords.module.css';

const initialWords = [
  { id: 0, en: 'table', ua: 'стіл' },
  { id: 1, en: 'car', ua: 'автомобіль' },
  { id: 2, en: 'bus', ua: 'автобус' },
  { id: 3, en: 'man', ua: 'людина' },
  { id: 4, en: 'boy', ua: 'хлопець' },
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function TranslateWorlds() {
  const [enWords, setEnWords] = useState([]);
  const [uaWords, setUaWords] = useState([]);
  const [selectedEnId, setSelectedEnId] = useState(null);
  const [selectedUaId, setSelectedUaId] = useState(null);
  const [correctIds, setCorrectIds] = useState([]);

  const [incorrectEnId, setIncorrectEnId] = useState(null);
  const [incorrectUaId, setIncorrectUaId] = useState(null);

  useEffect(() => {
    const shuffled = shuffleArray(initialWords);
    setEnWords(shuffleArray(shuffled.map(word => ({ id: word.id, text: word.en }))));
    setUaWords(shuffleArray(shuffled.map(word => ({ id: word.id, text: word.ua }))));
  }, []);

  useEffect(() => {
    if (selectedEnId !== null && selectedUaId !== null) {
      if (selectedEnId === selectedUaId) {
        // Правильная пара
        setCorrectIds(prev => [...prev, selectedEnId]);

        setTimeout(() => {
          setEnWords(prev => prev.filter(word => word.id !== selectedEnId));
          setUaWords(prev => prev.filter(word => word.id !== selectedUaId));
        }, 1000);
      } else {
        //  Неправильная пара
        setIncorrectEnId(selectedEnId);
        setIncorrectUaId(selectedUaId);
        setTimeout(() => {
          setIncorrectEnId(null);
          setIncorrectUaId(null);
        }, 1000);
      }

      // Сброс выбранных
      setTimeout(() => {
        setSelectedEnId(null);
        setSelectedUaId(null);
      }, 1000);
    }
  }, [selectedEnId, selectedUaId]);

  return (
    <div className={styles.container}>
      <h2>Translate words</h2>
      <div className={styles.wrapper}>
        <ul>
          {enWords.map(word => {
            const isCorrect = correctIds.includes(word.id);
            const isIncorrect = word.id === incorrectEnId;
            const isSelected = word.id === selectedEnId;
            return (
              <li
                key={word.id}
                onClick={() => setSelectedEnId(word.id)}
                className={`${isCorrect ? styles.done : ''} ${isIncorrect ? styles.incorrect : ''} ${isSelected ? styles.selected : ''}`}
              >
                {word.text}
              </li>
            );
          })}
        </ul>
        <ul>
          {uaWords.map(word => {
            const isCorrect = correctIds.includes(word.id);
            const isIncorrect = word.id === incorrectUaId;
            const isSelected = word.id === selectedUaId;
            return (
              <li
                key={word.id}
                onClick={() => setSelectedUaId(word.id)}
                className={`${isCorrect ? styles.done : ''} ${isIncorrect ? styles.incorrect : ''} ${isSelected ? styles.selected : ''}`}
              >
                {word.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TranslateWorlds;
