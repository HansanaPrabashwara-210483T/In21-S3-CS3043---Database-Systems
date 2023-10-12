import express from "express"
import mysql from "mysql2"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({ path: './db.env'});

const app = express()

const db = mysql.createConnection({
<<<<<<< Updated upstream
    host:"localhost",
    user:"root",
    password:"root123",
    database:"airlinesystem"
})
=======
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_NAME,
});
>>>>>>> Stashed changes

app.use(express.json());
app.use(cors());


/**
 * Aircraft Models
 */

app.get("/", (req,res)=>{
    res.json("Hello this is the backend");
})

app.get("/aircraft_model", (req,res)=>{
    const q = "SELECT * FROM aircraft_model"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.post("/aircraft_model", (req,res)=>{
    const q = "INSERT INTO aircraft_model (`brand`,`model`,`economy_seats`,`business_seats`,`platinum_seats`) VALUES (?);";
    const values = [
        req.body.brand,
        req.body.model,
        req.body.economy_seats,
        req.body.business_seats,
        req.body.platinum_seats
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});



/**
 * Airport
 */


app.get("/airport", (req,res)=>{
    const q = "SELECT * FROM airport"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/airport", (req,res)=>{
    const q = "INSERT INTO airport (`airport_code`,`name`,`country`,`state`,`city`,`lat`,`lon`) VALUES (?);";
    const values = [
        req.body.airport_code,
        req.body.name,
        req.body.country,
        req.body.state,
        req.body.city,
        req.body.lat,
        req.body.lon
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});



/**
 * Aircraft
 */

app.get("/aircraft", (req,res)=>{
    const q = "SELECT * FROM aircraft"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/aircraft", (req,res)=>{
    const q = "INSERT INTO aircraft (`model_id`,`call_sign`) VALUES (?);";
    const values = [
        req.body.model_id,
        req.body.call_sign,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


/**
 * Routes
 */
app.get("/route", (req,res)=>{
    const q = "SELECT * FROM route"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/route", (req,res)=>{
    const q = "INSERT INTO route (`origin`,`destination`,`economy_price`,`business_price`,`platinum_price`) VALUES (?);";
    const values = [
        req.body.origin,
        req.body.destination,
        req.body.economy_price,
        req.body.business_price,
        req.body.platinum_price
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});



/**
 * Flight
 */

app.get("/flight", (req,res)=>{
    const q = "SELECT * FROM flight"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Delay mechanism to deal with delays and update the expected arrival time
app.post("/flight", (req, res) => {
    const q = `
        UPDATE flight
        SET arrival_time = DATE_ADD(arrival_time, INTERVAL ? HOUR),
            departure_time = DATE_ADD(departure_time, INTERVAL ? HOUR),
            delay = ?,
            status = 'delayed'
        WHERE flight_id = ?;
    `;
    const values = [
        req.body.delayed_time,
        req.body.delayed_time,
        req.body.delayed_time,
        req.body.flight_id
    ];
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.post("/flight", (req,res)=>{
    const q = "INSERT INTO flight (`route_id`,`aircraft_id`,`departure_time`,`expected_arrival_time`) VALUES (?);";
    const values = [
        req.body.route_id,
        req.body.aircraft_id,
        req.body.departure_time,
        req.body.expected_arrival_time,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});



/**
 * Membership 
 */

app.get("/membership", (req,res)=>{
    const q = "SELECT * FROM membership"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/membership", (req,res)=>{
    const q = "INSERT INTO membership (`mem_type_id`,`discount_rate`,`mem_type`) VALUES (?);";
    const values = [
        req.body.mem_type_id,
        req.body.discount_rate,
        req.body.mem_type,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


/**
 * Registered User
 */

app.get("/user", (req,res)=>{
    const q = "SELECT * FROM registered_user"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

/**
 * TODO
 * Password should be hashed
 * Admin should be aleto create more admins
 * All users should be able to change password and name and other data'
 * Membership should be updated accordingly
 */
app.post("/user", (req,res)=>{
    const q = "INSERT INTO registered_user(`membership`,`username`,`password`,`name`,`date_of_birth`,`address`,`phone_number`, `nic`,`passport_id`,`user_role`) VALUES (?);";
    const values = [
        req.body.membership,
        req.body.username,
        req.body.password,
        req.body.name,
        req.body.date_of_birth,
        req.body.address,
        req.body.phone_number,
        req.body.nic,
        req.body.passport_id,
        req.body.user_role,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});



app.listen(8000, ()=>{
    console.log("Connected to the backend . . .")
});