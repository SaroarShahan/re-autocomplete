import React from 'react';
import AutoComplete from './AutoComplete';
import countryList from "./data"

function App() {
  return (
    <div style={{width: "60%", margin: "auto"}}>
      <AutoComplete items={countryList} />
    </div>
  );
}

export default App;
