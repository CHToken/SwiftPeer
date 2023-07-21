const ValidationUtils = {
  isValidEmail: (email) => {
    // Implement your email validation logic here
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidUsername: (username) => {
    // Example: Check if the username has at least 1 characters
    return username.length >= 1;
  },
};

export default ValidationUtils;
