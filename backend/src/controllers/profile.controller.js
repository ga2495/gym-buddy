const pool = require("../config/db");

// ==============================
// GET MY PROFILE
// ==============================

const getProfile = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        age,
        gender,
        height,
        weight,
        fitness_goal,
        experience,
        gym_name,
        workout_time,
        city,
        bio,
        profile_image,
        role,
        created_at
      FROM users
      WHERE id = $1
      `,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

// ==============================
// UPDATE PROFILE
// ==============================

const updateProfile = async (req, res) => {

  try {

    const {
      full_name,
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

    const result = await pool.query(
      `
      UPDATE users
      SET
        full_name=$1,
        age=$2,
        gender=$3,
        height=$4,
        weight=$5,
        fitness_goal=$6,
        experience=$7,
        gym_name=$8,
        workout_time=$9,
        city=$10,
        bio=$11
      WHERE id=$12
      RETURNING
        id,
        full_name,
        email,
        age,
        gender,
        height,
        weight,
        fitness_goal,
        experience,
        gym_name,
        workout_time,
        city,
        bio,
        profile_image
      `,
      [
        full_name,
        age,
        gender,
        height,
        weight,
        fitness_goal,
        experience,
        gym_name,
        workout_time,
        city,
        bio,
        req.userId
      ]
    );

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      user: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

module.exports = {
  getProfile,
  updateProfile
};