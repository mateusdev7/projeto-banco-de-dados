create table users (
    id number generated always as identity,
    name varchar(400) not null,
    email varchar(50) not null,
    descriptionAccess varchar(45)not null,
    phone number not null,
    zipCode number not null,
    numberHome number not null,
    complement varchar(100) not null,
    professionName varchar(50) not null,
    primary key (id)
);