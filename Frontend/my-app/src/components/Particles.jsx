export default function Particles() {
    return (
      <div className="particles">
        {[...Array(100)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random()
            }}
          ></span>
        ))}
      </div>
    );
  }