# Festlive - Festival viewing and rating tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Awesome](https://awesome.re/badge.svg)](https://github.com)![Javascript](https://img.shields.io/badge/javascript-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)

Festlive is a tool for viewing and rating festivals throughout France. Write comments and notes to help future participants!


## Useful links

### Database schema

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model SubCategory {
  sub_category_id Int        @id @default(autoincrement())
  name            String     @unique
  categories      Category[]
}

model Category {
  category_id     Int          @id @default(autoincrement())
  name            String
  description     String?
  sub_category_id Int?
  subCategory     SubCategory? @relation(fields: [sub_category_id], references: [sub_category_id])
  festivals       Festival[]

  @@unique([name, sub_category_id])
  @@index([sub_category_id])
}

model Festival {
  festival_id String      @id
  name        String
  website_url String?
  category_id Int?
  region      String?
  department  String?
  city        String?
  postal_code String?
  latitude    Float?
  longitude   Float?
  street      String?
  street_nb   String?
  end_date    DateTime?
  start_date  DateTime?
  comments    Comment[]
  category    Category?   @relation(fields: [category_id], references: [category_id])
  totalRates  TotalRate[]
  userRates   UserRate[]

  @@index([category_id])
}

model User {
  user_id   Int        @id @default(autoincrement())
  username  String
  email     String
  comments  Comment[]
  userRates UserRate[]
}

model UserRate {
  user_rate_id Int      @id @default(autoincrement())
  festival_id  String
  user_id      Int
  rate         Int
  festival     Festival @relation(fields: [festival_id], references: [festival_id])
  user         User     @relation(fields: [user_id], references: [user_id])

  @@index([festival_id])
  @@index([user_id])
}

model TotalRate {
  total_rate_id Int      @id @default(autoincrement())
  festival_id   String
  total_rate    Int?
  festival      Festival @relation(fields: [festival_id], references: [festival_id])

  @@index([festival_id])
}

model Comment {
  comment_id  Int      @id @default(autoincrement())
  festival_id String
  user_id     Int
  comment     String?
  festival    Festival @relation(fields: [festival_id], references: [festival_id])
  user        User     @relation(fields: [user_id], references: [user_id])

  @@index([festival_id])
  @@index([user_id])
}

```


### Database class diagram

![Class diagram](https://i.imgur.com/IBQTJda.png)

### Database insertion script

```
import pandas as pd
from sqlalchemy import create_engine
import json

# Connexion à la base de données
engine = create_engine("postgresql://user:password@ip:port/database")

# Chargement du fichier CSV
file_path = './festivals_final.csv'
df = pd.read_csv(file_path, delimiter='|')

# Vérification des colonnes disponibles
print("Colonnes disponibles dans le DataFrame :")
print(df.columns)

# Traitement des coordonnées géographiques (latitude et longitude)
df['geocodage_xy'] = df['geocodage_xy'].apply(lambda x: json.loads(x.replace("'", '"')) if pd.notnull(x) else None)
df['latitude'] = df['geocodage_xy'].apply(lambda x: x['lat'] if x else None)
df['longitude'] = df['geocodage_xy'].apply(lambda x: x['lon'] if x else None)

# Transformation des dates au format TIMESTAMP
df['date_debut'] = pd.to_datetime(df['date_debut'], format='%d/%m/%Y', errors='coerce')
df['date_fin'] = pd.to_datetime(df['date_fin'], format='%d/%m/%Y', errors='coerce')

# Extraction et insertion des sous-catégories
sub_category_columns = [
    'sous_categorie_spectacle_vivant', 'sous_categorie_musique', 
    'sous_categorie_cinema_et_audiovisuel', 'sous_categorie_arts_visuels_et_arts_numeriques', 
    'sous_categorie_livre_et_litterature'
]

sub_categories = []
for col in sub_category_columns:
    if col in df.columns:
        sub_categories.extend(df[col].dropna().unique())

sub_category_df = pd.DataFrame(sub_categories, columns=['name']).drop_duplicates()
sub_category_df.to_sql('SubCategory', engine, if_exists='append', index=False)

# Récupération des IDs de sous-catégories
sub_category_ids = pd.read_sql('SELECT sub_category_id, name FROM "SubCategory"', engine)
sub_category_dict = dict(zip(sub_category_ids['name'], sub_category_ids['sub_category_id']))

# Extraction et insertion des catégories
categories = df[['discipline_dominante']].drop_duplicates()
categories.columns = ['name']
categories['sub_category_id'] = categories['name'].map(sub_category_dict)
categories.to_sql('Category', engine, if_exists='append', index=False)

# Récupération des IDs de catégories
category_ids = pd.read_sql('SELECT category_id, name FROM "Category"', engine)
category_dict = dict(zip(category_ids['name'], category_ids['category_id']))

# Insertion dans la table festival
festival_df = df[['identifiant', 'nom_du_festival', 'site_internet_du_festival', 'discipline_dominante', 'region_principale_de_deroulement', 
                  'departement_principal_de_deroulement', 'commune_principale_de_deroulement', 
                  'code_postal_de_la_commune_principale_de_deroulement', 'latitude', 'longitude', 
                  'adresse_postale', 'date_debut', 'date_fin']]

festival_df.columns = ['festival_id', 'name', 'website_url', 'category_name', 'region', 'department', 'city', 
                       'postal_code', 'latitude', 'longitude', 'street', 'start_date', 'end_date']

festival_df['category_id'] = festival_df['category_name'].map(category_dict)
festival_df = festival_df.drop(columns=['category_name'])

festival_df.to_sql('Festival', engine, if_exists='append', index=False)

print("Données insérées avec succès dans les tables sub_category, category et festival.")

```

### API routes

#### GET	/api/v1/festivals/

```javascript
OPTIONAL QUERY PARAMS

?ids=12,45,56
?category=category_id
?search=”search_content”
?limit=50
?offset=50

OUTPUT:

{
    "status": "success",
    "nb_results": 7270,
    "offset": 0,
    "limit": 20,
    "data": [
    {
        "festival_id": "FEST_01004_167",
        "name": "Coups de coeur d'Avignon",
        "website_url": "http://theatre-ecriture.fr",
        "category_id": 3,
        "region": "Auvergne-Rhône-Alpes",
        "department": "Ain",
        "city": "Ambérieu-en-Bugey",
        "postal_code": "1500",
        "latitude": 45.9608475114,
        "longitude": 5.3729257777,
        "street": "223 Rue Alexandre Bérard",
        "street_nb": null,
        "end_date": "2024-06-20T00:00:00.000Z",
        "start_date": "2024-01-01T00:00:00.000Z",
        "category": {
            "category_id": 3,
            "name": "Spectacle vivant",
            "description": null,
            "sub_category_id": 13
        }
    }
}

```

#### GET	/api/v1/festivals/:id

```javascript
OUTPUT:

{
    "status": "success",
    "data": {
        "festival_id": "FEST_01004_167",
        "name": "Coups de coeur d'Avignon",
        "website_url": "http://theatre-ecriture.fr",
        "category_id": 3,
        "region": "Auvergne-Rhône-Alpes",
        "department": "Ain",
        "city": "Ambérieu-en-Bugey",
        "postal_code": "1500",
        "latitude": 45.9608475114,
        "longitude": 5.3729257777,
        "street": "223 Rue Alexandre Bérard",
        "street_nb": null,
        "end_date": "2024-06-20T00:00:00.000Z",
        "start_date": "2024-01-01T00:00:00.000Z",
        "category": {
            "category_id": 3,
            "name": "Spectacle vivant",
            "description": null,
            "sub_category_id": 13
        }
    }
}

```

#### GET	/api/v1/categories/

```javascript
OPTIONAL QUERY PARAMS

?ids=12,45,56
?search=”search_content”
?limit=50
?offset=50

OUTPUT:

{
    "status": "success",
    "offset": 0,
    "limit": 20,
    "data": [
    {
        "category_id": 1,
        "name": "Musique",
        "description": null,
        "sub_category_id": 105
    }
}

```

#### GET	/api/v1/categories/2

```javascript
OUTPUT:

{
    "status": "success",
    "data": {
        "category_id": 2,
        "name": "Pluridisciplinaire",
        "description": null,
        "sub_category_id": 37
    }
}

```

### API error handling and codes

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class AuthenticationError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

class AuthorizationError extends AppError {
  constructor(message) {
    super(message, 403);
  }
}

export { AppError, AuthenticationError, AuthorizationError, ValidationError };
```

### API rate limiter

```javascript
import { NextResponse } from "next/server";

const rateLimitMap = new Map();

export default function rateLimitMiddleware(handler) {
  return async (req) => {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    const limit = 100; // Limiting requests to 5 per minute per IP
    const windowMs = 60 * 1000; // 1 minute

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      return NextResponse.json(
        {
          status: "error",
          message: "Rate limit exceeded. Please try again later.",
        },
        { status: 429 },
      );
    }

    ipData.count += 1;

    return handler(req);
  };
}
```
