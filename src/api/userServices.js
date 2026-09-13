const API_BASE_URL = "http://localhost:8080/";

export const apiUsers =  {

    async  singup (endpoint, body) {
    try {
        const response = await fetch(API_BASE_URL+endpoint, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        
        if (!response.ok) {
            return{
                success : false,
                status : response.status,
                error: data.message
            }
        }
        

        return data

    } catch (error) {
        return {
            success: false,
            status: null,
            error: error.message,
        };
    }

    }

}