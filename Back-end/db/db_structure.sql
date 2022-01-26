Create table etudiant (
    id integer primary key auto_increment,
    email varchar(30) not null unique,
    nom varchar(30) not null,
    prenom varchar(30) not null,
    password varchar(100) not null
)

