import { useState } from "react"
import Card from "./Card";

function App() {
  const [time, setTime] = useState(30);
  const [secTime, setSecTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [timeInterval, setTimeInterval] = useState(null);
  const [warninged, setWarninged] = useState(false);
  const [originalTime, setOriginalTime] = useState(30);
  const [originalSecTime, setOriginalSecTime] = useState(0);
  const [joke, setJoke] = useState("");

  const handleStart = () => {
    setWarninged(false);
    setJoke("");
    setIsPaused(false)

    let totalSeconds = parseInt(time || 0) * 60 + parseInt(secTime || 0);
    const id = setInterval(() => {
      if(totalSeconds<= 0){
        clearInterval(id)
        setIsPaused(true)
        return
      }
      totalSeconds--;

      setTime(Math.floor(totalSeconds/60));
      setSecTime(totalSeconds%60);
    }, 1000)
    setTimeInterval(id);
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
      alert("If you try to stop the timer prematurely again it will trigger a punishment and the Timer will be reset!");
      setWarninged(true);
    }
    else{
      getMeme()
      clearInterval(timeInterval);
      setIsPaused(true)
      setTime(originalTime);
      setSecTime(originalSecTime)
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
    <div className="flex justify-center items-center gap-10">
    <div className="flex flex-col items-center">
    <input type="text" inputMode="numeric" value={time} onChange={(e) => {
      const val = e.target.value;
      if(val == "" || /^[0-9]+$/.test(val) && val.length <= 2){
        const formattedval = val === "" ? "" : parseInt(val, 10).toString();
        setOriginalTime(formattedval)
        setTime(formattedval)
      }}} className="w-40 text-8xl font-bold text-center border-none accent-transparent focus:ring-0 focus:outline-none" disabled={!isPaused}/>
      <h3 className="text-3xl font-semibold">Minutes</h3>
      </div>
      <div>
      <input type="text" inputMode="numeric" value={secTime} onChange={(e) => {
        const val = e.target.value;
        
        if(val == "" || /^[0-9]+$/.test(val) && val.length <= 2){
          let num = parseInt(val, 10);
            if (num > 59) num = 59;
  
            const finalVal = val === "" ? "" : num.toString();
            setSecTime(finalVal);
            setOriginalSecTime(finalVal)
        }}} className="w-40 text-8xl font-bold text-center border-none accent-transparent focus:ring-0 focus:outline-none" disabled={!isPaused}/>
    <h3 className="text-3xl font-semibold">Seconds</h3>
      </div>
    </div>
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
