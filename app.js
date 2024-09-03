const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());

// Middleware для обработки JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('A simple Node App is'
        + ' running on this server')
    res.end()
})

// Middleware для проверки токена
function authMiddleware(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'Нет токена, авторизация запрещена' });
    }
  
    try {
      const decoded = jwt.verify(token, 'секретный ключ');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Токен недействителен' });
    }
  }

  // Пример защищенного маршрута
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'Это защищенный маршрут', user: req.user });
  });

// Подключение роутов
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT ||5000;
app.listen(PORT,console.log(`Server started on port ${PORT}`));