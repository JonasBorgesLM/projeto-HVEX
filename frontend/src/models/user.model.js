// Modelo de usuario
function User(email, password) {
    this.Email = email;
    this.Password = password;
  
    return {
      Email: email,
      Password: password,
    };
  }
  
  export default User;