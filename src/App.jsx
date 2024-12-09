import { useState } from 'react'
import './App.css'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


function App() {
  const [options, setOptions] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    number: false,
    symbols: false
  });

  const [isError, setIsError] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {

    //if none selected iserror=true display the select atleast one error
    if (
      !options?.uppercase && //?. checks if options exist first then checks options.uppercase
      !options?.lowercase &&
      !options?.number &&
      !options?.symbols
    ) {
      setIsError(true);
      return;
    }
    setIsError(false);

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolsChars = "!@#$%^&*()_+";

    let passwordChars = "";
    let password = "";

    //checking if an option is true/checked and if uppercase and symbols are the pool to pick from becomes ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+
    if (options.uppercase) {
      passwordChars += uppercaseChars;// Add uppercase letters if selected
    }

    if (options.lowercase) {
      passwordChars += lowercaseChars;// Add lowercase letters if selected.
    }

    if (options.number) {
      passwordChars += numberChars;// Add numbers if selected.
    }

    if (options.symbols) {
      passwordChars += symbolsChars; // Add symbols if selected.
    }

    const passwordLength = options.length;// Get the desired password length from options.

    for (let i = 0; i < passwordLength; i++) {
      const randIdx = Math.floor(Math.random() * passwordChars.length);
      password += passwordChars[randIdx];
    }

    setGeneratedPassword(password);
    console.log(password)
  }

  return (
    <div className='App'>
      <div className='card'>
        <div className='card-header'><p>PASSWORD GENERATOR</p></div>

        <div className='card-body'>
          <label>Password Length</label>
          <input type="number" value={options.length}
            onChange={({ target }) => {
              setOptions({ ...options, length: target.value });
            }} className="passwordlength" min={5} />

          <div className='checkboxes'>
            <div>
              <Checkbox checked={options.uppercase}// when the checkbox is clicked/checked, toggles the value of options.uppercase true to false or false to true
                onChange={() => { setOptions({ ...options, uppercase: !options.uppercase }) }} /><label>Uppercase</label>
            </div> {/* options is object and using spread creates a copy of all its properties when updating one property (to avoid overwriting the others) */}

            <div>
              <Checkbox checked={options.lowercase}
                onChange={() => { setOptions({ ...options, lowercase: !options.lowercase }) }} /><label>Lowercase</label>
            </div>

            <div>
              <Checkbox checked={options.number}
                onChange={() => { setOptions({ ...options, number: !options.number }) }} /><label>Number</label>
            </div>

            <div>
              <Checkbox checked={options.symbols}
                onChange={() => { setOptions({ ...options, symbols: !options.symbols }) }} /><label>Symbols</label>
            </div>
          </div>

          {isError && (
            <span className='error'>Select at least one</span>
          )}

          <Button variant="contained" className='btn' onClick={generatePassword} sx={{ backgroundColor: " #003049", color: '#FFFFFF', fontWeight: '700' }}>Generate Password</Button >
        </div>

        {generatedPassword && ( //if generatedpassword has value/its truthy so && is truthy and renders the div
          <div className='password'>
            <label>Password:</label>
            <p>{generatedPassword}</p>
          </div>
        )}

      </div>
    </div >
  )
}

export default App
