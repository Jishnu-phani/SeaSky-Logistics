-- DROP DATABASE IF EXISTS Seasky_Logistics;
-- CREATE DATABASE Seasky_Logistics;

DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
    User_ID CHAR(10) PRIMARY KEY,
    Password VARCHAR(100) NOT NULL,
    Contact_Number INT UNIQUE NOT NULL, 
    First_Name VARCHAR(100) NOT NULL,
    Last_Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS User_Role;
CREATE TABLE User_Role (
    User_ID CHAR(10),
    Role VARCHAR(50) NOT NULL DEFAULT 'User',
    FOREIGN KEY (User_ID) REFERENCES "User"(User_ID)
);

DROP TABLE IF EXISTS Passenger;
CREATE TABLE Passenger (
    Passenger_ID CHAR(10) PRIMARY KEY,
    Passport_Number CHAR(12) UNIQUE NOT NULL,
    User_ID CHAR(10),
    FOREIGN KEY (User_ID) REFERENCES "User"(User_ID)
);

DROP TABLE IF EXISTS No_Fly;
CREATE TABLE No_Fly (
    Passenger_ID CHAR(10),
    Reason VARCHAR(1000) NOT NULL,
    Date_Added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID)
);

DROP TABLE IF EXISTS Sender;
CREATE TABLE Sender (
    Sender_ID CHAR(10) PRIMARY KEY,
    Street VARCHAR(100),
    City VARCHAR(100) NOT NULL,
    State VARCHAR(100) NOT NULL,
    Country VARCHAR(100) NOT NULL,
    Company VARCHAR(100) NOT NULL,
    User_ID CHAR(10),
    FOREIGN KEY (User_ID) REFERENCES "User"(User_ID)
);

DROP TABLE IF EXISTS Receiver;
CREATE TABLE Receiver (
    Receiver_ID CHAR(10) PRIMARY KEY,
    First_Name VARCHAR(100) NOT NULL,
    Last_Name VARCHAR(100) NOT NULL,
    Street VARCHAR(100),
    City VARCHAR(100) NOT NULL,
    State VARCHAR(100) NOT NULL,
    Country VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS Booking;
CREATE TABLE Booking (
    Booking_ID CHAR(10) PRIMARY KEY,
    Booking_Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Departure_Date DATE NOT NULL,
    Status VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS Goods;
CREATE TABLE Goods (
    Package_ID CHAR(10) PRIMARY KEY,
    Weight DECIMAL(65,4) NOT NULL,
    Volume DECIMAL(65,4) NOT NULL,
    Regulation_Status VARCHAR(100) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    Fragile CHAR(3) NOT NULL CHECK (Fragile IN ('YES', 'NO')),
    Description VARCHAR(1000)
);

DROP TABLE IF EXISTS Regulation;
CREATE TABLE Regulation (
    Regulation_ID CHAR(10) PRIMARY KEY,
    Country VARCHAR(100) NOT NULL,
    Details VARCHAR(1000) NOT NULL,
    Tax_Rate DECIMAL(65,4) NOT NULL,
    Package_ID CHAR(10),
    FOREIGN KEY (Package_ID) REFERENCES Goods(Package_ID)
);

DROP TABLE IF EXISTS Shipment;
CREATE TABLE Shipment (
    Shipment_ID CHAR(10) PRIMARY KEY,
    Booking_Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Departure_Date DATE NOT NULL,
    Shipment_Status VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS Travel_Log;
CREATE TABLE Travel_Log (
    Log_ID CHAR(15) PRIMARY KEY,
    Travel_Status VARCHAR(100) NOT NULL,
    Origin VARCHAR(1000) NOT NULL,
    Destination VARCHAR(1000) NOT NULL,
    Date DATE NOT NULL,
    Mode_of_Transport VARCHAR(100) NOT NULL,
    ETA TIMESTAMP NOT NULL,
    Actual_end_time TIMESTAMP NOT NULL,
    Start_time TIME NOT NULL
);

DROP TABLE IF EXISTS Books;
CREATE TABLE Books (
    Passenger_ID CHAR(10),
    Booking_ID CHAR(10),
    Log_ID CHAR(15),
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID),
    FOREIGN KEY (Booking_ID) REFERENCES Booking(Booking_ID),
    FOREIGN KEY (Log_ID) REFERENCES Travel_Log(Log_ID)
);

DROP TABLE IF EXISTS Ships;
CREATE TABLE Ships (
    Sender_ID CHAR(10),
    Shipment_ID CHAR(10),
    Package_ID CHAR(10),
    Log_ID CHAR(15),
    Receiver_ID CHAR(10),
    FOREIGN KEY (Sender_ID) REFERENCES Sender(Sender_ID),
    FOREIGN KEY (Shipment_ID) REFERENCES Shipment(Shipment_ID),
    FOREIGN KEY (Package_ID) REFERENCES Goods(Package_ID),
    FOREIGN KEY (Log_ID) REFERENCES Travel_Log(Log_ID),
    FOREIGN KEY (Receiver_ID) REFERENCES Receiver(Receiver_ID)
);