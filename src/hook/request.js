import { useState } from "react";

const useRequest = () => {
    const [currentState, setCurrentState] = useState({
        isLoading: false,
        error: '',
    });

    const sendRequest = async (requestInfo, option) => {
        setCurrentState({
            ...currentState,
            isLoading: true,
            error: '',
        });

        try {
            const response = await fetch(
                requestInfo.url,
                {
                    headers: requestInfo.headers ? requestInfo.headers : {},
                    body: requestInfo.body ? requestInfo.body : null,
                    method: requestInfo.method ? requestInfo.method : "GET",
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }
            const data = response.json();
            option(data);
        }
        catch (err) {
            setCurrentState({
                ...currentState,
                error: err.message || "Something went wrong!"
            });
        }
        setCurrentState({
            ...currentState,
            isLoading: false,
        });
    };

    return {
        sendRequest,
        error: currentState.error,
        isLoading: currentState.isLoading,
    }
};

export default useRequest;
