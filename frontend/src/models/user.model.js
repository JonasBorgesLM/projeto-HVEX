function User(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  
    return {
      id: id,
      email: email,
      password: password,
    };
  }
  
  export default User;