import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasCharacter, setHasCharacter] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef("");

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    hasNumber ? (str += "0123456789") : null;
    hasCharacter ? (str += "@$%*_-{}[]()") : null;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      generatedPassword += str.charAt(char);
    }
    setPassword(generatedPassword);
  }, [length, hasNumber, hasCharacter, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 90);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, hasNumber, hasCharacter, setPassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-8 px-4 py-3 text-orange-500 bg-gray-800 overflow-hidden border-none">
        <h1 className="text-white text-center text-2xl mb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className=" border-none outline-none w-full py-1 px-3"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex justify-center text-sm gap-x-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              id="lengthSlider"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="lengthSlider">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={hasNumber}
              onChange={() => {
                setHasNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={hasCharacter}
              onChange={() => {
                setHasCharacter((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
