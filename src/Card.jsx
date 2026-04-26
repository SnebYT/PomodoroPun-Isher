import { useEffect, useState } from "react";

function Card({ joke, onComplete }) {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onComplete]); 

  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="text-center px-10">
        <p className="text-3xl text-white mb-8">{joke}</p>
        <div className="text-orange-500 font-mono text-xl border-2 border-orange-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
          {timer}
        </div>
        <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">
          Punishment ends in...
        </p>
      </div>
    </div>
  );
}

export default Card;