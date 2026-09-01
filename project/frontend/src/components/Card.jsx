const Card = ({ workout }) => {
  return (
    <div>
      <h3>Workout</h3>
      <ul>
        {workout.sets.map((set, index) =>
          <li key={index}>
            <p>{`${set.exercise} ${set.reps} reps`}</p>
          </li>)
        }
      </ul>
    </div>
  );
}

export default Card;
