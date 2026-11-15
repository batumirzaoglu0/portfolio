const stars = [
  { id: 1, top: '8%', left: '15%', delay: 1, dur: 11 },
  { id: 2, top: '18%', left: '55%', delay: 5, dur: 14 },
  { id: 3, top: '4%', left: '70%', delay: 9, dur: 12 },
  { id: 4, top: '25%', left: '30%', delay: 13, dur: 16 },
  { id: 5, top: '12%', left: '85%', delay: 7, dur: 13 },
];

function ShootingStars() {
  return (
    <div className="sky" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export default ShootingStars;