import  { useState } from 'react';

function CountryCodeSelector({ onCodeChange }) {
  const [selectedCode, setSelectedCode] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const mainCountryCodes = [
    { code: '+351', flag: '🇵🇹', country: 'Portugal' },
    { code: '+1', flag: '🇺🇸', country: 'United States' },
    { code: '+44', flag: '🇬🇧', country: 'United Kingdom' },
    { code: '+33', flag: '🇫🇷', country: 'France' },
    { code: '+49', flag: '🇩🇪', country: 'Germany' },
    { code: '+34', flag: '🇪🇸', country: 'Spain' },
    { code: '+39', flag: '🇮🇹', country: 'Italy' },
    { code: '+55', flag: '🇧🇷', country: 'Brazil' },
    { code: '+61', flag: '🇦🇺', country: 'Australia' },
    { code: '+91', flag: '🇮🇳', country: 'India' },
    { code: '+81', flag: '🇯🇵', country: 'Japan' },
    { code: '+82', flag: '🇰🇷', country: 'South Korea' },
    { code: '+86', flag: '🇨🇳', country: 'China' },
    { code: '+27', flag: '🇿🇦', country: 'South Africa' },
    { code: '+7', flag: '🇷🇺', country: 'Russia' },
    { code: '+42', flag: '🇨🇿', country: 'Czech Republic' },
    { code: '+31', flag: '🇳🇱', country: 'Netherlands' },
    { code: '+48', flag: '🇵🇱', country: 'Poland' },
    { code: '+46', flag: '🇸🇪', country: 'Sweden' },
    { code: '+98', flag: '🇮🇷', country: 'Iran' },
    { code: '+60', flag: '🇲🇾', country: 'Malaysia' },
    { code: '+65', flag: '🇸🇬', country: 'Singapore' },
    { code: '+971', flag: '🇦🇪', country: 'United Arab Emirates' },
    { code: '+52', flag: '🇲🇽', country: 'Mexico' },
  ];

  const handleCountryChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomInput(true);
      setSelectedCode('');
    } else {
      setSelectedCode(value);
      setCustomCode('');
      setShowCustomInput(false);
      onCodeChange(value); // Notify parent of the selected code
    }
  };

  const handleCustomCodeChange = (e) => {
    const value = e.target.value;
    const formattedCode = value.startsWith('+') ? value : `+${value}`;
    setCustomCode(formattedCode);
    setSelectedCode(formattedCode);
    onCodeChange(formattedCode); // Notify parent of the custom code
  };

  return (
    <div style={{ fontSize: '0.875rem', width: '200px', margin: '0 auto' }}>
      <label htmlFor='country-code' style={{ display: 'none' }}>Select your country code:</label>
      <select
        id='country-code'
        value={selectedCode}
        onChange={handleCountryChange}
        style={{
          width: '100%',
          padding: '4px',
          fontSize: '0.75rem',
          border: 'none',
          borderRadius: 'none',
        }}
      >
        <option value='' disabled>Select country</option>
        {mainCountryCodes.map(({ code, flag, country }) => (
          <option key={code} value={code}>
            {flag} {code} ({country})
          </option>
        ))}
        <option value='custom'>Other (Enter your own code)</option>
      </select>
      {showCustomInput && (
        <input
          type='text'
          value={customCode}
          onChange={handleCustomCodeChange}
          placeholder='Enter code'
          style={{
            width: '100%',
            padding: '4px',
            fontSize: '0.75rem',
            marginTop: '4px',
          }}
        />
      )}
    </div>
  );
}

export default CountryCodeSelector;
