import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Profile() {

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        fitness_goal: "",
        experience: "",
        gym_name: "",
        workout_time: "",
        city: "",
        bio: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await api.get("/profile");

            setForm({
                full_name: res.data.user.full_name || "",
                email: res.data.user.email || "",
                age: res.data.user.age || "",
                gender: res.data.user.gender || "",
                height: res.data.user.height || "",
                weight: res.data.user.weight || "",
                fitness_goal: res.data.user.fitness_goal || "",
                experience: res.data.user.experience || "",
                gym_name: res.data.user.gym_name || "",
                workout_time: res.data.user.workout_time || "",
                city: res.data.user.city || "",
                bio: res.data.user.bio || ""
            });

        } catch (err) {
            alert("Unable to load profile");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const updateProfile = async (e) => {

        e.preventDefault();

        try {

            await api.put("/profile", form);

            alert("Profile Updated Successfully");

        } catch (err) {

            alert(err.response?.data?.message || "Update Failed");

        }

    };

    return (

        <Layout>

            <div className="card shadow">

                <div className="card-body">

                    <h2>Edit Profile</h2>

                    <hr />

                    <form onSubmit={updateProfile}>

                        <input className="form-control mb-2" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" />

                        <input className="form-control mb-2" name="email" value={form.email} onChange={handleChange} placeholder="Email" />

                        <input className="form-control mb-2" name="age" value={form.age} onChange={handleChange} placeholder="Age" />

                        <input className="form-control mb-2" name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />

                        <input className="form-control mb-2" name="height" value={form.height} onChange={handleChange} placeholder="Height" />

                        <input className="form-control mb-2" name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" />

                        <input className="form-control mb-2" name="fitness_goal" value={form.fitness_goal} onChange={handleChange} placeholder="Fitness Goal" />

                        <input className="form-control mb-2" name="experience" value={form.experience} onChange={handleChange} placeholder="Experience" />

                        <input className="form-control mb-2" name="gym_name" value={form.gym_name} onChange={handleChange} placeholder="Gym Name" />

                        <input className="form-control mb-2" name="workout_time" value={form.workout_time} onChange={handleChange} placeholder="Workout Time" />

                        <input className="form-control mb-2" name="city" value={form.city} onChange={handleChange} placeholder="City" />

                        <textarea className="form-control mb-3" rows="4" name="bio" value={form.bio} onChange={handleChange} placeholder="Bio"></textarea>

                        <button className="btn btn-success w-100">

                            Update Profile

                        </button>

                    </form>

                </div>

            </div>

        </Layout>

    );

}

export default Profile;