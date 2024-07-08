# AA_uzdevums

Izveidot prototipu:
FE daļa:
Prototipam jāsatur statiska galvene ar logo un kājene ar versijas numuru(statisks cipars pēc jūsu izvēles)
Prototipam jāsatur ekrānformu ar tabulu, kurā var pievienot/dzēst tabulas ierakstus un tos rediģēt – rediģēšana jānodrošina ieklikšķinot tabulas šūnā uzreiz veicot rediģēšanu.
Tabulai ir pieejama meklēšana ar kuras palīdzību ir iespējams atfiltrēt tabulas ierakstus pēc jebkuras no tabulas ieraksta tekstuālām šūnām.
Tabulai ir pieejama lapošana ar iespēju mainīt ierakstu skaitu lapā.
BE daļa:
Izveidot aplikāciju izmantojot .NET 8, C#, Swagger un DB pēc savas izvēles.
Jābūt definētām C# klasēm, kas atbilsts datubāzes tabulai/tabulām (vēlams izmantot dažādus tipus laukiem)
Jābūt izveidotam vismaz vienam kontrolierim
Jāizveido vienkāršs API galapunkts, kas atgriež visus datus (visus tabulas ierakstus)
Jāizveido API galapunkts, kas atgriež datus pēc kāda parametra
Jāizveido API galapunkts, ar ko var pievienot datus datubāzē
Jāizveido API galapunkts, ar ko var labot datus
Jāizveido API galapunkts, ar ko pēc kāda parametra var izdzēst datus
Visiem API galapunktiem ir jābūt pieejamiem ar Swagger ar nelielu aprakstu par konkrēto galapunktu

## Apraksts

Prototips izstrādāts izmantojot .NET 8 priekš backend un HTML/Javascript priekš frontend. Projekts izpilda uzdevumā prasītos punktus. Tiek izveidota tabula kur iespējams veikt CRUD darbības un tabula ir formatēta atbilstoši prasībām. Ņemot vērā, ka netika norādīti konkrēti dati, ko tabulā vajadzetu glabāt, izvēlējos tabulu veidot pēc vienkārša formāta ID/Nosaukums/Apraksts/Pievienošanas datums. ID lauks ir automātiski inkrementējošs, attiecīgi, ja ieraksts tiek dzēsts, ID netiek atbrīvots un tiek skaitīts uz priekšu.

## Frontend

### Funkcionalitāte

- Statiska galvene ar logo
- Kājene ar versijas nummuru
- Tabulas funkcionalitāte:
  - Pievienot ierakstu
  - Izmainīt ierakstu
  - Dzēst ierakstu
  - Meklēt ierakstu
  - Sadalīt ierakstus pa lapām

### Izmantotās tehnoloģijas

- HTML
- CSS
- JavaScript
- Bootstrap

### Palaišanas Instrukcijas

1. Install dependencies:

   ```sh
   npm install
   ```

2. Build the project:

   ```sh
   npm run build
   ```

3. Palaist frontend:
   Atvērt risinājuma properties un uzstādīt gan `FrontendApp`, gan `BackendApi` , kā startēšanas projektus. (solis nav obligāts, bet ievērojami atvieglo darbu).

## Backend

### Funkcionalitāte

- RESTful API ar endpointiem priekš:
  - Visu ierakstu atgriešanas
  - Atgriezt ierakstu pec ID
  - Pievienot jaunu ierakstu
  - Izmainīt esošu ierakstu
  - Dzēst ierakstu
- Swagger documentācija

### Izmantotās tehnoloģijas

- .NET 8
- Entity Framework Core
- SQL Server

### Instrukcijas

1. Iekš `appsettings.json` faila papildiniet rindu ar savienojumu uz savu datu bāzi, par piemēru var izmantot šo:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=your_server;Database=your_database;User Id=your_username;Password=your_password;"
     }
   }
   ```

2. Palaist datubāzes migrāciju:

   ```sh
   dotnet ef database update
   ```

3. Palaist backend:
   Atvērt risinājuma properties un uzstādīt gan `FrontendApp`, gan `BackendApi` , kā startēšanas projektus. (solis nav obligāts, bet ievērojami atvieglo darbu).

## Aplikācijas palaišana

1. Nodrošināt, ka frontend un backend ir palaists.
2. Interneta pārlūkā atvērt `https://localhost:7165/Records`.
