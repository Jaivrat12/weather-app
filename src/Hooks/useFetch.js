import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);

    useEffect(() => {

        // console.log('useEffect:', url);
        if(url) {

            fetch(url)
                .then(response => response.json())
                .then(data => setData(data));
        }
    
    }, [url]);

    return { data };
};

export default useFetch;