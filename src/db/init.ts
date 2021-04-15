const Database = require('./config')

const initDb = 
{
   async init()
   {         

        const db = await Database()

        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            avatar TEXT, 
            monthly_budget INT, 
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            hour_value INT,
            gitHubUser TEXT,
            pass TEXT
        )`);

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            owner TEXT,
            name TEXT, 
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        await db.run(`INSERT INTO profile (
            name, 
            avatar, 
            monthly_budget, 
            days_per_week, 
            hours_per_day, 
            vacation_per_year,
            hour_value,
            gitHubUser, 
            pass
        ) VALUES (
            "Bruno",
            "https://avatars.githubusercontent.com/bjsavino",
            3000,
            5,
            5,
            4,
            70,
            "bjsavino",
            "$2b$10$bKAXXRjvvs1V8LhVJmozie.s6VMmxBC.pLFJ7WYTmOswkTZ88.5zS"
        );`)

        await db.run(`INSERT INTO jobs (
            owner,
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "bjsavino",
            "Pizzaria Guloso",
            2,
            1,
            "2021-04-13T18:35:55.021Z"
        );`)

        await db.run(`INSERT INTO jobs (
            owner,
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "bjsavino",
            "OneTwo Projects",
            3,
            47,
            "2021-04-14T18:35:55.021Z"
        );`)

        await db.close()
    }
}

initDb.init()