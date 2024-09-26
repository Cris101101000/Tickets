import React, { useState } from 'react';
import AppContent from './components/AppContent';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AppContent user={user} setUser={setUser} />
  );
};

export default App;
