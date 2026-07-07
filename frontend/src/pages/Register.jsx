import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        full_name: "",
        email: "",
        password: "",
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

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", form);

            alert("Registration Successful");

            navigate("/login");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="container mt-4">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center">

                                Register

                            </h2>

                            <form onSubmit={handleSubmit}>

                                <input className="form-control mb-2" placeholder="Full Name" name="full_name" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Email" name="email" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Password" type="password" name="password" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Age" name="age" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Gender" name="gender" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Height" name="height" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Weight" name="weight" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Fitness Goal" name="fitness_goal" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Experience" name="experience" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Gym Name" name="gym_name" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="Workout Time" name="workout_time" onChange={handleChange}/>

                                <input className="form-control mb-2" placeholder="City" name="city" onChange={handleChange}/>

                                <textarea className="form-control mb-3" placeholder="Bio" name="bio" onChange={handleChange}></textarea>

                                <button className="btn btn-success w-100">

                                    Register

                                </button>

                            </form>

                            <p className="mt-3">

                                Already have an account?

                                <Link to="/login">

                                    Login

                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;