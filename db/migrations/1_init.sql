create TABLE if not EXISTS "User"(
    "id" VARCHAR (36) PRIMARY KEY,
    "name" VARCHAR (250) NOT NULL,
    "email" VARCHAR (250) UNIQUE NOT NULL
);
