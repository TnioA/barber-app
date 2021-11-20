const BASE_API = 'https://apibosta.com/api'

export default new class Api {

  async checkToken(email: string, password: string){
    const response = await fetch(`${BASE_API}/endpoin1/getall`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    
    return await response.json();
  }

  async signIn(email: string, password: string){
    const response = await fetch(`${BASE_API}/endpoin2/getall`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    
    return await response.json();
  }

  async signUp(name: string, email: string, password: string){
    const response = await fetch(`${BASE_API}/endpoin3/getall`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });
    
    return await response.json();
  }
}