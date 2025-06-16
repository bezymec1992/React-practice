import { useState } from 'react';
import styles from './CoupleMatch.module.css';

const boys = [
  { id: 1, name: 'Олег' },
  { id: 2, name: 'Дима' },
  { id: 3, name: 'Коля' },
  { id: 4, name: 'Витя' },
];

const girls = [
  { id: 1, name: 'Маша' },
  { id: 2, name: 'Валя' },
  { id: 3, name: 'Моника' },
  { id: 4, name: 'София' },
];

function CoupleMatch() {
  const [boysTeam, setBoysTeam] = useState(boys);
  const [girlsTeam, setGirlsTeam] = useState(girls);
  const [selectedBoy, setSelectedBoy] = useState();
  const [selectedGirl, setSelectedGirl] = useState();
  const [createdCouples, setCreatedCouples] = useState([]);

  function onSelectBoy(boyId) {
    const selectedBoy = boysTeam.find(b => b.id === boyId);
    setSelectedBoy(selectedBoy);
  }

  function onSelectGirl(girlId) {
    const selectedGirl = girlsTeam.find(g => g.id === girlId);
    setSelectedGirl(selectedGirl);
  }

  function createCouple() {
    // Добавляем пару
    setCreatedCouples(prev => [...prev, { boy: selectedBoy, girl: selectedGirl }]);

    // Удаляем их из команд
    setBoysTeam(prev => prev.filter(b => b.id !== selectedBoy.id));
    setGirlsTeam(prev => prev.filter(g => g.id !== selectedGirl.id));

    // Сбрасываем выбранных
    setSelectedBoy(null);
    setSelectedGirl(null);
  }

  return (
    <div className={styles.wrapper}>
      <h1>Find couple</h1>
      <div className={styles.container}>
        <ul>
          <h2>Boys</h2>
          {boysTeam.map(boy => (
            <li
              key={boy.id}
              onClick={() => onSelectBoy(boy.id)}
              style={{ background: selectedBoy?.id === boy.id ? 'pink' : '' }}
            >
              {boy.name}
            </li>
          ))}
        </ul>

        <ul>
          <h2>Girls</h2>
          {girlsTeam.map(girl => (
            <li
              key={girl.id}
              onClick={() => onSelectGirl(girl.id)}
              style={{ background: selectedGirl?.id === girl.id ? 'pink' : '' }}
            >
              {girl.name}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={createCouple} disabled={!selectedBoy || !selectedGirl}>
        Create Couple
      </button>

      <div>
        <h3>Созданные пары:</h3>
        <ul>
          {createdCouples.map((pair, index) => (
            <li key={index}>
              {pair.boy.name} --- {pair.girl.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CoupleMatch;
