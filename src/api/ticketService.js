const API_BASE_URL = "http://localhost:8080/";

export const ticketServices = {
  async getAll(endpoint, token) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : 'Bearer ' + token
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }
    console.log(response)
    return await response.json();
  },

  async purchaseTicket(endpoint, token, body){
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method:'POST',
        headers:  {
            "Content-Type": "application/json",
            "Authorization" : 'Bearer ' + token
        },
        body: JSON.stringify(body)
    })
    if(!response.ok){
        throw new Error(`Error http  ${response.body}`)
    }
     const data = await response.json();

    console.log("responseService-", data);

    return data;
  }
  

};