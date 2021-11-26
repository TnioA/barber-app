import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_API = 'https://barber-test-api.herokuapp.com/api';

export default new class Api {

  async checkToken(token: string | null){
    var token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_API}/checktoken`, {
      method: 'POST',
      headers: {'Authorization': token || '', 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({token})
    });
    
    return await response.json();
  }

  async signIn(email: string, password: string){
    email = 'hortanio@hotmail.com';
    password = '123';
    const response = await fetch(`${BASE_API}/signin`, {
      method: 'POST',
      headers: {'Authorization': '', 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });
    
    return await response.json();
  }

  async signUp(name: string, email: string, password: string){
    const response = await fetch(`${BASE_API}/signup`, {
      method: 'POST',
      headers: {'Authorization': '', 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password})
    });
    
    return await response.json();
  }

  async logout(){
    var token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_API}/signup`, {
      method: 'POST',
      headers: {'Authorization': token || '', 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({})
    });
    
    return await response.json();
  }

  async getBarbers(latitude = null, longitude = null, location: string | null = null){
    var token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_API}/getbarbers`, {
      method: 'GET',
      headers: {'Authorization': token || '', 'Accept': 'application/json', 'Content-Type': 'application/json'}
    });
    
    return await response.json();
  }

  async getBarber(id: number){
    var token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_API}/getbarber?id=${id}`, {
      method: 'GET',
      headers: {'Authorization': token || '', 'Accept': 'application/json', 'Content-Type': 'application/json'}
    });
    
    return await response.json();
  }

  async favoriteBarber(barberId: number){
    var token = await AsyncStorage.getItem('token');

    const response = await fetch(`${BASE_API}/favoriteBarber`, {
      method: 'POST',
      headers: {'Authorization': token || '', 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({barberId})
    });
    
    return await response.json();
  }
}