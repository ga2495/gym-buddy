const pool = require("../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");

// =======================
// REGISTER
// =======================
const register = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      fitness_goal,
      experience,
      gym_name,
      workout_time,
      city,
      bio
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email and Password are required."
      });
    }

    const userExists = await pool.query(
      "SELECT id FROM users WHERE email=$1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users
      (
        full_name,
        email,
        password,
        age,
        gender,
        height,
        weight,
        fitness_goal,
        experience,
        gym_name,
        workout_time,
        city,
        bio
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      )
      RETURNING
      id,
      full_name,
      email,
      city,
      gym_name,
      fitness_goal
      `,
      [
        full_name,
        email,
        hashedPassword,
        age,
        gender,
        height,
        weight,
        fitness_goal,
        experience,
        gym_name,
        workout_time,
        city,
        bio
      ]
    );

    const user = result.rows[0];

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token: generateToken(user.id),
      user
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// =======================
// LOGIN
// =======================
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        console.log("========== LOGIN ==========");
        console.log("Email Entered:", email);

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required."
            });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        console.log("Users Found:", result.rows.length);

        if (result.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const user = result.rows[0];

        console.log("DB Password:", user.password);

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = generateToken(user.id);

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                city: user.city,
                gym_name: user.gym_name,
                fitness_goal: user.fitness_goal
            }
        });

    } catch (err) {

        console.error("LOGIN ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// =======================
// PROFILE
// =======================
const profile = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE id=$1
      `,
      [req.userId]
    );

    res.json({
      success: true,
      user: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

module.exports = {
  register,
  login,
  profile
};