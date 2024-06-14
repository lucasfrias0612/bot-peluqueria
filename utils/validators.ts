const isValidName = (name: string) => {
    const nameRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/;
    return nameRegex.test(name);
};

export { isValidName };