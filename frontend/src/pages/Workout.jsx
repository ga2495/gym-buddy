import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Workout() {

    const [workouts, setWorkouts] = useState([]);

    const [form, setForm] = useState({
        exercise_name: "",
        sets: "",
        reps: "",
        workout_day: ""
    });

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            const res = await api.get("/workout");
            setWorkouts(res.data.workouts);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const addWorkout = async (e) => {

        e.preventDefault();

        try {

            await api.post("/workout", form);

            setForm({
                exercise_name: "",
                sets: "",
                reps: "",
                workout_day: ""
            });

            loadWorkouts();

        } catch (err) {

            alert("Unable to add workout");

        }

    };

    const deleteWorkout = async (id) => {

        if (!window.confirm("Delete this workout?")) return;

        await api.delete(`/workout/${id}`);

        loadWorkouts();

    };

    return (

        <Layout>

            <div className="card shadow">

                <div className="card-body">

                    <h2>Workout Planner</h2>

                    <hr />

                    <form
                        className="row g-2"
                        onSubmit={addWorkout}
                    >

                        <div className="col-md-4">

                            <input
                                className="form-control"
                                placeholder="Exercise"
                                name="exercise_name"
                                value={form.exercise_name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-2">

                            <input
                                className="form-control"
                                placeholder="Sets"
                                name="sets"
                                value={form.sets}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-2">

                            <input
                                className="form-control"
                                placeholder="Reps"
                                name="reps"
                                value={form.reps}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-2">

                            <input
                                className="form-control"
                                placeholder="Day"
                                name="workout_day"
                                value={form.workout_day}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-2">

                            <button className="btn btn-success w-100">

                                Add

                            </button>

                        </div>

                    </form>

                    <hr />

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Exercise</th>

                                <th>Sets</th>

                                <th>Reps</th>

                                <th>Day</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                workouts.map((workout) => (

                                    <tr key={workout.id}>

                                        <td>{workout.exercise_name}</td>

                                        <td>{workout.sets}</td>

                                        <td>{workout.reps}</td>

                                        <td>{workout.workout_day}</td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteWorkout(workout.id)}
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>

    );

}

export default Workout;