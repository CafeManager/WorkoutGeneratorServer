"use strict";

const db = require("../db");

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

class WorkOut {
    static async addSession({ exercises, username, time }) {
        console.log("Addsession");
        console.log(exercises);
        let exer3 = "";
        const exer2 = await db.query(
            ` INSERT INTO session (username, date_completed) VALUES ($1, $2) RETURNING id`,
            [username, time]
        );
        let sessionID = exer2.rows[0].id;
        for (let exercise of exercises) {
            const exer = await db.query(
                `INSERT INTO exercises (name, reps, total_sets, total_weight) VALUES ($1, $2, $3, $4) RETURNING id`,
                [
                    exercise["name"],
                    exercise["sets"],
                    exercise["reps"],
                    exercise["weight"],
                ]
            );
            let exerciseID = exer.rows[0].id;

            exer3 = await db.query(
                `INSERT INTO session_exercises (session_id, exercises_id) VALUES ($1, $2)`,
                [sessionID, exerciseID]
            );
        }

        return exer3;
    }

    static async getExerciseFromSession(id) {
        let res = await db.query(
            `SELECT * FROM exercises JOIN session_exercises on exercises_id = exercises.id JOIN session ON session.id = session_exercises.session_id WHERE session.id = $1;`,
            [id]
        );
        return res.rows;
    }

    static async getLast30Days(username) {
        let res = await db.query(
            ` SELECT * FROM session where date_completed > current_date - interval '30' day AND username = $1`,
            [username]
        );
        return res.rows;
    }
}

module.exports = WorkOut;
