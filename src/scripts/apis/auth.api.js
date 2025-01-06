export class AuthApi {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async register(user) {
      try {
        const response = await fetch(`${this.baseUrl}/auth/register`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        return response.json()
  
      } catch (error) {
        console.log(error);
      }
    }
  
    async login(credentials) {
      try {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please fill in all fields");
        }
  
        const response = await fetch(`${this.baseUrl}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        return response.json()
  
      } catch (error) {
        console.log(error);
      }
    }
  }