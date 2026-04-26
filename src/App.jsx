import { useState } from "react"
import Card from "./Card";

function App() {
  const [time, setTime] = useState(30);
  const [isPaused, setIsPaused] = useState(true);
  const [timeInterval, setTimeInterval] = useState(null);
  const [warninged, setWarninged] = useState(false);
  const [originalTime, setOriginalTime] = useState(30);
  const [joke, setJoke] = useState("");

  const handleStart = () => {
    setWarninged(false);
    setJoke("");
    setTimeInterval(setInterval(() => {
      setTime((prev) =>{
        if(prev <= 1){
          clearInterval(timeInterval);
          setIsPaused(true);
          return 0;
        }
        else{
          return prev-1;
        }
      });
    }, 60000))
    setIsPaused(false)
  }

  // const handlePause = () => {
  //   clearInterval(timeInterval);
  //   setIsPaused((prevPause) => !prevPause)
  // }
  const getMeme = () => {
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        "Accept": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJoke(data.joke);
      })
      .catch((err) => console.error("Joke failed:", err));
  };

  const handleStop = () => {
    if(!warninged){
      alert("If you stop the timer prematurely it will trigger a dad joke and reset the Timer!");
      setWarninged(true);
    }
    else{
      getMeme()
      clearInterval(timeInterval);
      setIsPaused(true)
      setTime(originalTime);
    }
  }

  // useEffect(() => {
  //   if(time <= 0){
  //     handleStop();
  //   }
  // }, [time])
  return (
    <>
    <h1 className="text-orange-500 text-5xl mt-40 mb-10 font-bold font-sans text-shadow-md">Pomodoro <br/> Pun-isher</h1>
    <input type="text" inputMode="numeric" value={time} onChange={(e) => {
      const val = e.target.value;
      if(val == "" || /^[0-9]+$/.test(val)){
        const formattedval = val === "" ? "" : parseInt(val, 10).toString();
        setOriginalTime(formattedval)
        setTime(formattedval)
      }}} className="text-8xl font-bold text-center border-none accent-transparent focus:ring-0 focus:outline-none" disabled={!isPaused}/>
    <h3 className="text-3xl font-semibold">Minutes</h3>
    <div className="mt-10 flex gap-5 justify-center">
      {/* <button className="text-3xl font-semibold focus:ring-0 focus:outline-none border-none bg-white text-black rounded-md px-3 py-1" onClick={handleStart}>Start</button> */}
      <button className="text-3xl font-semibold focus:ring-0 focus:outline-none border-none bg-white text-black rounded-md px-3 py-1" onClick={isPaused? handleStart : handleStop}>{isPaused? "Start":"Stop"}</button>
      {/* <button className="text-3xl font-semibold focus:ring-0 focus:outline-none border-none bg-white text-black rounded-md px-3 py-1" onClick={handleStop} >Stop</button> */}
    </div>
    {joke && <Card joke={joke} onComplete={() => setJoke("")} />}
    </>
  )
}

export default App
