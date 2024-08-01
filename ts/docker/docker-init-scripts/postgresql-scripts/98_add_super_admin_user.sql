
INSERT INTO users (email, username, fullname, password, role) 
VALUES ('webadminuser@estetixs.com', 'webadminuser', 'Admin', '$2a$10$TwlZZvqENLakI3NCXYjTqeHzwxhL3iBqdIOeS00D43VB53.z3jETe', 'Admin');

WITH inserted_user AS (
    INSERT INTO users (email, username, fullname, password, role) 
    VALUES ('testdoctor@estetixs.com', 'testdoctor', 'TestDoctor', '$2a$10$TwlZZvqENLakI3NCXYjTqeHzwxhL3iBqdIOeS00D43VB53.z3jETe', 'Doctor')
    RETURNING id, username
)
INSERT INTO doctors (user_id, doctor_url,title)
SELECT id, username, 'Plastic Surgeon' FROM inserted_user;


WITH inserted_user AS (
    INSERT INTO users (email, username, fullname, password, role) 
    VALUES ('doctor@estetixs.com', 'doctor', 'Doctor', '$2a$10$TwlZZvqENLakI3NCXYjTqeHzwxhL3iBqdIOeS00D43VB53.z3jETe', 'Doctor')
    RETURNING id, username
)
INSERT INTO doctors (user_id, doctor_url,title)
SELECT id, username, 'Plastic Surgeon' FROM inserted_user;