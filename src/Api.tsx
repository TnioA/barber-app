import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_API = 'https://barber-test-api.herokuapp.com/api';

export default new class Api {

  async checkToken(token: string | null){
    return await this.post(`/checktoken`, null, true);
  }

  async signIn(email: string, password: string){
    return await this.post(`/signin`, {email, password});
  }

  async signUp(name: string, email: string, password: string){
    return await this.post(`/signup`, {name, email, password});
  }

  async logout(){
    return await this.post(`/logout`, {}, true);
  }

  async getBarbers(latitude = null, longitude = null, location = null){
    return await this.get(`/getbarbers?location=${location}&latitude=${latitude}&longitude=${longitude}`, true);
  }

  async getBarber(id: number){
    return await this.get(`/getbarber?id=${id}`, true);
  }

  async favoriteBarber(barberId: number, state: boolean){
    return await this.post(`/favoriteBarber`, {barberId, state: state}, true);
  }

  async getFavoritedBarbers(){
    return await this.get(`/getfavoritedbarbers`, true);
  }

  async setAppointment(appontment: object){
    return await this.post(`/setappointment`, appontment, true);
  }

  async getAppointments(){
    return await this.get(`/getappointments`, true);
  }

  // :::: PRIVATE METHODS ::::
  private async get(url: string, needAuthorization: boolean = false){
    var token = `Bearer ${needAuthorization ? await AsyncStorage.getItem('token') : ''}`;

    const response = await fetch(`${BASE_API}${url}`, {
      method: 'GET',
      headers: {'Authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json'}
    });
    
    return await response.json();
  }

  private async post(url: string, body: any, needAuthorization: boolean = false){
    var token = `Bearer ${needAuthorization ? await AsyncStorage.getItem('token') : ''}`;

    const response = await fetch(`${BASE_API}${url}`, {
      method: 'POST',
      headers: {'Authorization': token, 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: body !== null ? JSON.stringify(body) : null
    });
    
    return await response.json();
  }
}