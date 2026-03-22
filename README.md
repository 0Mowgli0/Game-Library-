# 🎮 Game Library

Ett personligt spelbibliotek där du kan samla, organisera och hålla koll på dina spel.

---

## 📋 Krav

Se till att du har följande installerat innan du kör projektet:

- [Node.js](https://nodejs.org/) (v18 eller senare)
- [MySQL](https://www.mysql.com/)

---

## 🚀 Kom igång

### 1. Klona projektet
Obs! Glöm inte att Klona projektet. 
Jag klonar i Github Desktop
```

### 2. Skapa databasen i MySQL

Öppna MySQL Workbench eller din terminal och kör:
Jag öppnar new Query:
```sql
CREATE DATABASE game_library;
```

## 🗄️ Importering av befintlig data

Om du vill importera spel som redan finns i projektet, kör följande kommando.
```bash
mysql --default-character-set=utf8mb4 -u root -p game_library < game_library.sql
```
skriv in ditt lösenord när de frågar


### 3. Konfigurera backend

Gå in i backend-mappen:
```bash
cd backend
```

Installera dependencies:
```bash
npm install
```

Skapa en `.env` fil baserat på `.env.example`.
Glöm inte att stå i backend-mappen när du skapar filen:
```bash
copy .env.exemple.  .env
```

Öppna `.env` och fyll i dina egna uppgifter:
```
DB_USERNAME=root
DB_PASSWORD=ditt_mysql_lösenord
DB_DATABASE=game_library
DB_HOST=127.0.0.1
```

Starta backend:
```bash
npm run dev
```

Backend körs nu på `http://localhost:5000`

---

### 4. Konfigurera frontend

Öppna en ny terminal och gå in i frontend-mappen:
```bash
cd frontend
```

Installera dependencies:
```bash
npm install
```

Starta frontend:
```bash
npm run dev
```

Frontend körs nu på `http://localhost:5173`

---


## 📝 Hur du bidrar med ändringar

### Om du ändrat i koden:
```bash
git add .
git commit -m "Beskriv vad du ändrat, t.ex. 'Lade till FIFA 26'"
git push
```

### Om du vill att databasändringarna ska synas för andra:

Exportera databasen genom att stå i **projektets rotmapp** och köra följande kommando.
Byt ut `DITT_LÖSENORD` mot ditt eget MySQL-lösenord:
```bash
mysqldump --default-character-set=utf8mb4 -u root -p game_library > game_library.sql
```

---

## ⚠️ Viktigt

- Pusha **aldrig** `.env`-filen till GitHub — den innehåller ditt lösenord
- `.env.example` ska alltid vara uppdaterad med rätt variabelnamn men utan riktiga värden