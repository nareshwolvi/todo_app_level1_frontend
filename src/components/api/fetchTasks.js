async function fetchTaskAPI(handleResponse, handleError){
    try {
        
        // Base URL for API end point -> our own API
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

        // Endpoint for fetching the data
        const endpoint = "/tasks";

        // Construct the full URL using URL endpoint
        // const url = new URL(baseUrl, endpoint) -> Using Constructor
        const url = `${baseUrl}${endpoint}`;
        console.log(url);
        

        // Send a GET request to the constructed URL
        const response = await fetch(url);

        // Extract jsonData from the Response
        const jsonData = await response.json();

        // Check if the response is not successfull
        if(!response.ok){
            const errorMessage = jsonData.message || "unknown error occured";
            // throw this error in catch block
            throw new Error(errorMessage);
        }

        // if successfull, Pass the fetched data to the handle Response function for further processing
        handleResponse(jsonData);

    } //handle error
    catch (error) {
        handleError(error);
    }
}

export default fetchTaskAPI;


