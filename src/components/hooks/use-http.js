import {useCallback, useState} from "react";

const useHttp = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {url, headers, setResponse, method} = props;

    const executeHttp = useCallback((body = null) => {
        setIsLoading(true);
        try {
            fetch(
                url,
                {
                    method: method ?? 'GET',
                    body: body ? JSON.stringify(body) : body,
                    headers: headers ?? {},
                }
            ).then((response) => {
                if (!response.ok) {
                    throw new Error('Request failed!');
                }

                return response.json()
            }).then((data) => {
                setIsLoading(false);
                setError(null);
                if (setResponse) {
                    setResponse(data)
                }
            });
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Something went wrong!');
        }
    }, [url, method, headers, setResponse]);

    return {
        isLoading,
        error,
        executeHttp
    };
}

export default useHttp;