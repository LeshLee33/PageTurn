# Используем официальный образ Node.js 16 в качестве базового
FROM node:16

# Устанавливаем рабочую директорию /app
WORKDIR /app

# Копируем файл package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Открываем порт
EXPOSE 3000

# Запускаем команду для старта сервера разработки
CMD ["npm", "start"]