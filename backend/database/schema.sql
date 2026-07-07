DROP TABLE IF EXISTS workout_logs CASCADE;
DROP TABLE IF EXISTS workout_plans CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS friendships CASCADE;
DROP TABLE IF EXISTS friend_requests CASCADE;
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    age INTEGER,

    gender VARCHAR(20),

    height DECIMAL(5,2),

    weight DECIMAL(5,2),

    fitness_goal VARCHAR(100),

    experience VARCHAR(50),

    gym_name VARCHAR(100),

    workout_time VARCHAR(50),

    city VARCHAR(100),

    bio TEXT,

    profile_image TEXT,

    role VARCHAR(20) DEFAULT 'user',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE friend_requests (

    id SERIAL PRIMARY KEY,

    sender_id INTEGER NOT NULL,

    receiver_id INTEGER NOT NULL,

    status VARCHAR(20) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sender
        FOREIGN KEY(sender_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_receiver
        FOREIGN KEY(receiver_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
CREATE TABLE friendships (

    id SERIAL PRIMARY KEY,

    user1_id INTEGER NOT NULL,

    user2_id INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user1
        FOREIGN KEY(user1_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user2
        FOREIGN KEY(user2_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
CREATE TABLE messages (

    id SERIAL PRIMARY KEY,

    sender_id INTEGER NOT NULL,

    receiver_id INTEGER NOT NULL,

    message TEXT NOT NULL,

    is_seen BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_message_sender
        FOREIGN KEY(sender_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_message_receiver
        FOREIGN KEY(receiver_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
CREATE TABLE workout_plans (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    exercise_name VARCHAR(100) NOT NULL,

    sets INTEGER,

    reps INTEGER,

    workout_day VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workout_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
CREATE TABLE workout_logs (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    exercise_name VARCHAR(100),

    weight DECIMAL(5,2),

    duration INTEGER,

    calories INTEGER,

    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_log_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_gym ON users(gym_name);
CREATE INDEX idx_users_goal ON users(fitness_goal);
CREATE INDEX idx_users_email ON users(email);