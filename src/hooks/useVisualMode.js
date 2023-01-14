// To pass the first test our useVisualMode Hook will need to:

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property
import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
      setMode(history[history.length - 2]);
    }
  }

  return { mode, transition, back };
}