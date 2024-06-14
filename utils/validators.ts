const isValidName = (name: string) => {
    const nameRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/;
    return nameRegex.test(name);
};

const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export { isValidName, isValidEmail };