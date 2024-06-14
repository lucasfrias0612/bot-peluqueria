const isValidName = (name: string) => {
    const nameRegex = /^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/;
    return nameRegex.test(name);
};

const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const isAffirmative = (text: string) => {
    const affirmativeOptions = ['a huevo', 'simon', 'venga', 'si', 'claro', 'correcto', 'afirmativo', 'por supuesto', 'vale', 'orale', 'pues si', 'andale', 'ok', 'okay', 'okey', 'desde luego'];
    text = text.toLocaleLowerCase().trim();
    return affirmativeOptions.some(option => option == text);
}

const normalizeText = (text: string) => {
    return text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export { isValidName, isValidEmail, isAffirmative, normalizeText };