import React, { useState, useEffect } from 'react';

function useFetch(url) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchData = async () => {
			setIsPending(true);

			try {
				const res = await fetch(url, {
					signal: abortController.signal,
				});
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				const json = await res.json();

				setError(null);
				setIsPending(false);
				setData(json);
			} catch (err) {
				if (err.name === 'AbortError') {
					console.log('fetch was aborted');
				} else {
					setIsPending(false);
					setError('Could not fetch the data');
					console.error(err.message);
				}
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, [url]);

	return { data, isPending, error };
}

export { useFetch };
