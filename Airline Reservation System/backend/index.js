import express from "express"
import mysql from "mysql2"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({ path: './db.env'});

const app = express()

const db = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_NAME,
});

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


app.delete("/aircraft_model/:id", (req,res)=>{
    const modelId = req.params.id
    const q  = "DELETE from aircraft_model where model_id = ?"

    db.query(q,[modelId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Aircraft Model has been deleted successfully")
    });
})


app.put("/aircraft_model/:id", (req,res)=>{
    const modelId = req.params.id
    const q  = "UPDATE aircraft_model SET `brand`=?, `model`=?, `economy_seats` = ?, `business_seats` = ? , `platinum_seats`=? where model_id = ?"

    const values = [
        req.body.brand,
        req.body.model,
        req.body.economy_seats,
        req.body.business_seats,
        req.body.platinum_seats
    ];

    db.query(q,[...values,modelId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Aircraft model has been updated successfully")
    });
})


/**
 * Airport
 */


app.get("/airport", (req,res)=>{
    const q = "SELECT * FROM airport where valid = 1"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/airport", (req,res)=>{
    const q = "INSERT INTO airport (`airport_code`,`name`, `location_id`) VALUES (?);";
    const values = [
        req.body.airport_code,
        req.body.name,
        req.body.location_id,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


app.delete("/airport/:id", (req,res)=>{
    const airportId = req.params.id
    const q  = "DELETE from airport where airport_code = ?"

    db.query(q,[airportId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Airport has been deleted successfully")
    });
})


app.put("/airport/:id", (req,res)=>{
    const airportId = req.params.id
    const q  = "UPDATE airport SET `airport_code`= ?,`name` = ?, `location_id` = ? where airport_code = ?"

    const values = [
        req.body.airport_code,
        req.body.name,
        req.body.location_id,
    ];

    db.query(q,[...values,airportId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Airport has been updated successfully")
    });
})



/**
 * Aircraft
 */

app.get("/aircraft/:id", (req,res)=>{
    const aircraftId = req.params.id
    const q = "SELECT * FROM aircraft where aircraft_id = ?"
    db.query(q,[aircraftId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.get("/aircraft", (req,res)=>{
    const q = "SELECT * FROM aircraft where valid = 1"
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


app.delete("/aircraft/:id", (req,res)=>{
    const aircraftId = req.params.id
    const q  = "DELETE from aircraft where aircraft_id = ?"

    db.query(q,[aircraftId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Aircraft has been deleted successfully")
    });
})


app.put("/aircraft/:id", (req,res)=>{
    const aircraftId = req.params.id
    const q  = "UPDATE aircraft SET `model_id`=?, `call_sign`=? where aircraft_id = ?"

    const values = [
        req.body.model_id,
        req.body.call_sign,
    ];

    db.query(q,[...values,aircraftId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Aircraft has been updated successfully")
    });
})


/**
 * Routes
 */
app.get("/route", (req,res)=>{
    const q = "SELECT * FROM route where valid = 1"
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

app.delete("/route/:id", (req,res)=>{
    const routeId = req.params.id
    const q  = "DELETE from route where route_id = ?"

    db.query(q,[routeId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Route has been deleted successfully")
    });
})


app.put("/route/:id", (req,res)=>{
    const routeId = req.params.id
    const q  = "UPDATE route SET `origin`=?, `destination`=?,`economy_price`=?,`business_price`=?,`platinum_price`=? where route_id = ?"

    const values = [
        req.body.origin,
        req.body.destination,
        req.body.economy_price,
        req.body.business_price,
        req.body.platinum_price
    ];

    db.query(q,[...values,routeId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Route has been updated successfully")
    });
})



/**
 * Locations
 */

app.get("/location", (req,res)=>{
    const q = "SELECT * FROM location where valid = 1"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.post("/location", (req,res)=>{
    const q = "INSERT INTO location (`location_name`,`parent_location_id`) VALUES (?);";
    const values = [
        req.body.location_name,
        req.body.parent_location_id
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.delete("/location/:id", (req,res)=>{
    const locationId = req.params.id
    const q  = "DELETE from location where location_id = ?"

    db.query(q,[locationId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Location has been deleted successfully")
    });
})


app.put("/location/:id", (req,res)=>{
    const locationId = req.params.id
    const q  = "UPDATE location SET `location_name` = ?,`parent_location_id` = ? where location_id = ?"

    const values = [
        req.body.location_name,
        req.body.parent_location_id,
    ];

    db.query(q,[...values,locationId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Location has been updated successfully")
    });
})






/**
 * Flight
 */

app.get("/flight", (req,res)=>{
    const q = "SELECT * FROM flight where valid = 1"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// // Delay mechanism to deal with delays and update the expected arrival time
// app.post("/flight", (req, res) => {
//     const q = `
//         UPDATE flight
//         SET arrival_time = DATE_ADD(arrival_time, INTERVAL ? HOUR),
//             departure_time = DATE_ADD(departure_time, INTERVAL ? HOUR),
//             delay = ?,
//             status = 'delayed'
//         WHERE flight_id = ?;
//     `;
//     const values = [
//         req.body.delayed_time,
//         req.body.delayed_time,
//         req.body.delayed_time,
//         req.body.flight_id
//     ];
//     db.query(q, values, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

app.post("/flight", (req,res)=>{
    const q = "INSERT INTO flight (`route_id`,`aircraft_id`,`departure_time`,`arrival_time`,`status`) VALUE (?);";
    const values = [
        req.body.route_id,
        req.body.aircraft_id,
        req.body.departure_time,
        req.body.arrival_time,
        req.body.status,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.delete("/flight/:id", (req,res)=>{
    const flightId = req.params.id
    const q  = "UPDATE flight SET `valid` = 0 where flight_id = ?"

    db.query(q,[flightId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Flight has been deleted successfully")
    });
})


app.put("/flight/:id", (req,res)=>{
    const flightId = req.params.id
    const q  = "UPDATE flight SET `route_id` = ?,`aircraft_id` = ?,`departure_time` = ?,`arrival_time` = ?,`status` = ? where flight_id = ?"

    const values = [
        req.body.route_id,
        req.body.aircraft_id,
        req.body.departure_time,
        req.body.arrival_time,
        req.body.status,
        req.body.delay
    ];

    db.query(q,[...values,flightId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("flight has been updated successfully")
    });
})



/**
 * Shedule
 */
app.get("/shedule", (req,res)=>{
    const q = "select a.call_sign, r.origin, r.destination, f.departure_time, f.arrival_time, f.status, f.delay from flight as f join route as r on r.route_id = f.route_id join aircraft as a on a.aircraft_id = f.aircraft_id WHERE f.arrival_time > CURRENT_TIMESTAMP()"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



/**
 * Booking
 */
//displaying all routes
app.get("/routes", (req, res) => {
    const sql = "SELECT * FROM route";

    db.query(sql, (err, rows) => {
        if (err) return res.json(err);
        return res.json(rows);
    });
});

// Get rows related to a specific route by route_id
app.get("/route/:route_id", (req, res) => {
    const route_id = req.params.route_id;  //input variable to get flight relating to selected route in future

    const sql = "SELECT * FROM flight WHERE flight.flight_id = ? AND flight.departure_time > CURDATE()";

    db.query(sql, [route_id], (err, rows) => {
        if (err) return res.json(err);
        return res.json(rows);
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
 * Admin should be able to create more admins
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