const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Пример "базы данных" пользователей
const users = [];

// Регистрация
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Проверка на существующего пользователя
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ msg: 'Пользователь уже существует' });
    }

    // Создание нового пользователя
    users.push({ email, password });
    res.status(201).json({ msg: 'Регистрация успешна' });
});

// Вход
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({ msg: 'Неверный логин или пароль' });
    }

    // Генерация токена
    const token = jwt.sign({ email }, 'секретный ключ', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
