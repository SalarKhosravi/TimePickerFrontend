import { useState, useEffect, useCallback } from 'react';

const useFetch = (fetchFunction, initialData = null) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction();
            if (result.data) {
                setData(result.data);
            } else if (result.message) {
                setError(result.message);
            } else {
                setError("Unexpected response format");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
