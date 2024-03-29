create table users (
    id int not null auto_increment,
    username varchar(55) not null unique,
    password varchar(55) not null,
    fname varchar(55) not null,
    lname varchar(55) not null,
    admin boolean not null,
    primary key(id)
);

create table buildings (
    id int not null auto_increment,
    name varchar(55) not null unique,
    primary key(id)
);

create table rooms (
    id int not null auto_increment,
    number varchar(55) not null,
    seats int not null,
    projector boolean not null,
    building integer not null,
    primary key(id),
    foreign key (building) references buildings(id)
);

create table recurs (
    id int not null auto_increment,
    weekdays varchar(7) not null,
    end date not null,
    primary key (id)
);

create table events (
    id int not null auto_increment,
    title varchar(55) not null,
    date date not null,
    startTime time not null,
    endTime time not null,
    recur int,
    room int not null,
    user int,
    primary key (id),
    foreign key (recur) references recurs(id),
    foreign key (room) references rooms(id),
    foreign key (user) references users(id)
);