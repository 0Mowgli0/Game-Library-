# 🎮 Game Library

Ett personligt spelbibliotek där du kan samla, organisera och hålla koll på dina spel.

---

## 📋 Krav

Se till att du har följande installerat innan du kör projektet:

- [Node.js](https://nodejs.org/) (v18 eller senare)
- [MySQL](https://dev.mysql.com/downloads/installer/) Ta denna Windows (x86, 32-bit), MSI Installer — installera MySQL Server + MySQL Workbench
- [Git](https://git-scm.com/) eller [GitHub Desktop](https://desktop.github.com/)

---

## 🚀 Kom igång

### 1. Klona projektet

Klona projektet via GitHub Desktop eller terminalen:
```bash
git clone https://github.com/DITT_ANVÄNDARNAMN/DITT_REPO.git
```

### 2. Skapa databasen i MySQL

Öppna MySQL Workbench, skapa en ny Query och kör:
```sql
CREATE DATABASE game_library;
```

### 3. Skapa en .env fil 
Skapa en `.env` fil baserat på `.env.example`.

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

Öppna `.env` och fyll i dina egna uppgifter:
```
DB_USERNAME=root
DB_PASSWORD=ditt_mysql_lösenord
DB_DATABASE=game_library
DB_HOST=127.0.0.1
```

### 4. Importera befintlig data

Öppna terminalen och se till att du står i **projektets rotmapp**.

**Om du använder PowerShell (Windows):**
```bash
cmd /c '"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql" --default-character-set=utf8mb4 -u root -p game_library < game_library.sql'
```

**Om du använder Mac/Linux:**
```bash
mysql --default-character-set=utf8mb4 -u root -p game_library < game_library.sql
```

Skriv in ditt MySQL-lösenord när det frågas.

### 5. Konfigurera backend

Öppna en terminal och gå in i backend-mappen:
```bash
cd backend
```

Installera dependencies:
```bash
npm install
```

Installera dotenv:
```bash
npm install dotenv
```

Installera bcrypt:
```bash
npm install bcrypt jsonwebtoken cookie-parser
```

Starta backend:
```bash
npm run dev
```

Backend körs nu på `http://localhost:5000`

---

### 6. Konfigurera frontend

Öppna en **ny terminal** och gå in i frontend-mappen:
```bash
cd frontend
```


Installera dependencies:
```bash
npm install
```

installera detta kommando för animationer: 
```bash
npm install framer-motion
```
```
```
Starta frontend:
```bash
npm run dev
```

Frontend körs nu på `http://localhost:5173`

---

## 📝 Hur du bidrar med ändringar

### Om du lagt till/ändrat/tagit bort spel och vill att andra ska se det:

Exportera databasen genom att stå i **projektets rotmapp** i command prompten i visual studio code.

**Windows (command promt):**
```bash
mysqldump --default-character-set=utf8mb4 -u root -p game_library > game_library.sql

```
- OBS!!! Om `mysql` inte känns igen i PowerShell, lägg till MySQL i PATH:
```bash
$env:Path += ";C:\Program Files\MySQL\MySQL Server 8.0\bin"
```

**Mac/Linux:**
```bash
mysqldump --default-character-set=utf8mb4 -u root -p game_library > game_library.sql
```

Pusha sedan filen till GitHub:
```bash
git add game_library.sql
git commit -m "Uppdaterade databas med nya spel"
git push
```

### När du hämtar någon annans ändringar:
```bash
git pull
```

Om databasen också uppdaterats, importera den igen med kommandot i steg 3.

---

## ⚠️ Viktigt

- Pusha **aldrig** `.env`-filen till GitHub — den innehåller ditt lösenord
- `.env.example` ska alltid vara uppdaterad med rätt variabelnamn men utan riktiga värden

//

Test av rabbtkod: 
koder: 
GAMER10 = 10% 
GAMER20 = 20%
HALF50 = 50%
