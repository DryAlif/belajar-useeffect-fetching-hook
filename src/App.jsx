import React, { useState } from 'react';
import TripList from './components/TripList';

function App() {
	const [showTrips, setShowTrips] = useState(true);

	return (
		<div className='App'>
			<button onClick={() => setShowTrips(false)}> realod </button>
			{showTrips && <TripList />}
		</div>
	);
}

export default App;
