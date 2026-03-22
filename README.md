# 🎮 Game Library

Ett personligt spelbibliotek där du kan samla, organisera och hålla koll på dina spel.

---

## 📋 Krav

Se till att du har följande installerat innan du kör projektet:

- [Node.js](https://nodejs.org/) (v18 eller senare)
- [MySQL](https://www.mysql.com/)

---

## 🚀 Kom igång

Glöm inte att clona projektet

### 2. Skapa databasen i MySQL

Öppna MySQL Workbench eller din terminal och kör:
```sql
CREATE DATABASE game_library;
```

### 3. Konfigurera backend

Gå in i backend-mappen:
```bash
cd backend
```

Installera dependencies:
```bash
npm install
```

Skapa en `.env` fil baserat på `.env.example` 
Glöm inte att stå i backend när du skapar fil:
```bash
cp .env 
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

## 🗄️ Importera exempeldata (valfritt)

Om du vill importera spel som redan finns i projektet, kör följande i MySQL Workbench eller terminalen:
```bash
mysql -u root -p game_library < backend/posts.sql
```

---

## 📝 Hur du bidrar med ändringar


### Om du vill att databasändringarna ska synas för andra:

Exportera databasen från MySQL Workbench:

1. Öppna **MySQL Workbench**
2. Gå till **Server → Data Export**
3. Välj databasen `game_library`
4. Välj **Export to Self-Contained File**
5. Spara filen som `backend/posts.sql`
6. Pusha filen till GitHub:
```bash
git add backend/posts.sql
git commit -m "Uppdaterade databas med nya spel"
git push
```

### När någon annan hämtar din kod och vill ha din data:
```bash
git pull
mysql -u root -p game_library < backend/posts.sql
```

---


## ⚠️ Viktigt

- Pusha **aldrig** `.env`-filen till GitHub — den innehåller ditt lösenord
- `.env.example` ska alltid vara uppdaterad med rätt variabelnamn men utan riktiga värden