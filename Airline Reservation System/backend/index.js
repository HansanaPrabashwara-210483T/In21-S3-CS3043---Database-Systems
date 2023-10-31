import express from "express"
import cors from "cors"
import db from "./config/db.js";
import authRouter from "./routes/auth.js";
import e from "express";


const app = express()

app.use(express.json());
app.use(cors());

// For all authentication or profile-related routes, use the auth.js router
app.use('/auth', authRouter);

/* 
app.get('/auth/register', (req, res) => {
    res.send("Done");
}); 
*/

/**
 * Aircraft Models
 */

app.get("/", (req,res)=>{
    res.json("Hello this is the backend");
})

app.get("/aircraft_model", (req,res)=>{
    const q = "SELECT * FROM aircraft_model WHERE valid = 1"
    db.execute(q,(err,data)=>{
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

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


app.delete("/aircraft_model/:id", (req,res)=>{
    const modelId = req.params.id
    const q  = "UPDATE from aircraft_model SET `valid` = 0 where model_id = ?"

    db.execute(q,[modelId],(err,data)=>{
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

    db.execute(q,[...values,modelId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Aircraft model has been updated successfully")
    });
})


/**
 * Airport
 */


app.get("/airport", (req,res)=>{
    const q = "SELECT * FROM airport where valid = 1"
    db.execute(q,(err,data)=>{
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

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


app.delete("/airport/:id", (req,res)=>{
    const airportId = req.params.id
    const q  = "UPDATE airport SET `valid` = 0 where airport_code = ?"

    db.execute(q,[airportId],(err,data)=>{
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

    db.execute(q,[...values,airportId],(err,data)=>{
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
    db.execute(q,[aircraftId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.get("/aircraft", (req,res)=>{
    const q = "SELECT * FROM aircraft where valid = 1"
    db.execute(q,(err,data)=>{
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

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


app.delete("/aircraft/:id", (req,res)=>{
    const aircraftId = req.params.id
    const q  = "UPDATE aircraft SET `valid` = 0 where aircraft_id = ?"

    db.execute(q,[aircraftId],(err,data)=>{
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

    db.execute(q,[...values,aircraftId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Aircraft has been updated successfully")
    });
})


/**
 * Routes
 */
app.get("/route", (req,res)=>{
    const q = "SELECT * FROM route where valid = 1"
    db.execute(q,(err,data)=>{
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

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.delete("/route/:id", (req,res)=>{
    const routeId = req.params.id
    const q  = "UPDATE route SET `valid` = 0 where route_id = ?"

    db.execute(q,[routeId],(err,data)=>{
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

    db.execute(q,[...values,routeId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Route has been updated successfully")
    });
})



/**
 * Locations
 */

app.get("/location", (req,res)=>{
    const q = "SELECT * FROM location"
    db.execute(q,(err,data)=>{
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

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.delete("/location/:id", (req,res)=>{
    const locationId = req.params.id
    const q  = "DELETE from location where location_id = ?"

    db.execute(q,[locationId],(err,data)=>{
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

    db.execute(q,[...values,locationId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Location has been updated successfully")
    });
})






/**
 * Flight
 */

app.get("/flight", (req,res)=>{
    const q = "SELECT * FROM flight where valid = 1 ORDER BY departure_time ASC"
    db.execute(q,(err,data)=>{
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
//     db.execute(q, values, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

app.post("/flight", (req,res)=>{
    const q = "INSERT INTO flight (`route_id`,`aircraft_id`,`departure_time`,`arrival_time`,`status`) VALUE (?);"
    const values = [
        req.body.route_id,
        req.body.aircraft_id,
        req.body.departure_time,
        req.body.arrival_time,
        req.body.status,
    ];
    console.log(values)
    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.delete("/flight/:id", (req,res)=>{
    const flightId = req.params.id
    const q  = "UPDATE flight SET `valid` = 0 where flight_id = ?"

    db.execute(q,[flightId],(err,data)=>{
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

    db.execute(q,[...values,flightId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("flight has been updated successfully")
    });
})

/**
 * Delays
 */
app.get("/delay", (req,res)=>{
    const q = "SELECT * FROM flight where valid = 1 and arrival_time > CURRENT_TIMESTAMP() ORDER BY departure_time ASC "
    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.put("/arrival_delay/:id", (req,res)=>{
    const flightId = req.params.id
    const q  = "UPDATE flight SET `arrival_time` = ADDTIME(`arrival_time`," + '"' + ""+req.body.delay_arrival+"" + '"' + "),`delay` = 1 where flight_id = ?"
    // ,
    const values = [
        req.body.delay_arrival,
    ];
    db.execute(q,[flightId],(err,data)=>{
        // if(err) return res.json(err)
        if(err){
            console.log(err)
            return res.json(err)
        }
        return console.log("delay has been updated successfully")
    });
})


app.put("/departure_delay/:id", (req,res)=>{
    const flightId = req.params.id
    const q  = "UPDATE flight SET `departure_time` = ADDTIME(`departure_time`," + '"' + ""+req.body.delay_departure+"" + '"' + "),`delay` = 1 where flight_id = ?";

  
    db.execute(q,[flightId],(err,data)=>{
        // if(err) return res.json(err)
        if(err){
            console.log(err)
            return res.json(err)
        }
        return console.log("delay has been updated successfully")
    });
})





/**
 * Booking List
 * */


app.get("/booking_list", (req,res)=>{
    const q = "SELECT * FROM booking ORDER BY booking_id DESC"
    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// This will invalidate a booking
app.delete("/booking_list/:id", (req,res)=>{
    const aircraftId = req.params.id
    const q  = "UPDATE booking SET `payment_status`= 0 where booking_id = ?"

    db.execute(q,[aircraftId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Booking has been Invalidated successfully")
    });
})


// This will validate a booking
app.put("/booking_list/:id", (req,res)=>{
    const aircraftId = req.params.id
    console.log(aircraftId)
    const q  = "UPDATE booking SET `payment_status`= 1 where booking_id = ?;"
    db.execute(q,[aircraftId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Booking has been validated successfully")
    });
})



/**
 * User
 */
app.get("/user_list", (req,res)=>{
    const q = "SELECT user_id,membership,username,login_status,customer_id, f.num_bookings FROM user_view as u join user_booking_count as f on u.user_id = f.reg_user_id"
    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


/**
 * Dashboard
 */
app.get("/in_air", (req,res)=>{
    const q = "SELECT * FROM flight where valid = 1 and departure_time < CURRENT_TIMESTAMP() and arrival_time > CURRENT_TIMESTAMP()"
    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/in_air", (req,res)=>{
    const q1 = "UPDATE flight SET `status` = 'IN_AIR' where departure_time < CURRENT_TIMESTAMP() and arrival_time > CURRENT_TIMESTAMP()"
    db.execute(q1,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)  
    })
})
app.post("/in_air", (req,res)=>{
    const q = "UPDATE flight SET `status` = 'IN_AIR' where departure_time < CURRENT_TIMESTAMP() and arrival_time > CURRENT_TIMESTAMP()";

    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.put("/in_air", (req,res)=>{
    const q = "UPDATE flight SET `status` = 'ARRIVED' where  arrival_time < CURRENT_TIMESTAMP()";

    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


app.get("/boarding", (req,res)=>{
    const q = "SELECT * FROM flight where valid = 1 and TIMESTAMPDIFF(MINUTE,CURRENT_TIMESTAMP(),departure_time) < 10 and TIMESTAMPDIFF(MINUTE,CURRENT_TIMESTAMP(),departure_time) > 0"
    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/boarding", (req,res)=>{
    const q = "UPDATE flight SET `status` = 'ARRIVED' where TIMESTAMPDIFF(MINUTE,CURRENT_TIMESTAMP(),departure_time) < 10 and TIMESTAMPDIFF(MINUTE,CURRENT_TIMESTAMP(),departure_time) > 0";

    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


/**
 * Reports
 */

// Report 1

app.get("/report_1/:id", (req,res)=>{
    const flightId =  req.params.id
    // const q =  "SELECT * FROM flight"
    // const q = "SELECT customer.customer_id, user_type, name, address, nic, passport_id from customer join booking on customer.customer_id = booking.customer_id where booking.flight_id = ?"
    //vilash
    const p = `
            SELECT customer_id, user_type, name, address, nic, passport_id, date_of_birth,
            CASE
                WHEN TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) > 18 THEN 'adult'
                ELSE 'child'
            END AS age_category
            FROM airline_project_g24.customer
            WHERE customer_id in (SELECT customer_id FROM booking WHERE flight_id = ?);  
            `;
    db.execute(p,[flightId],(err,data)=>{
        if(err) return console.log(err)
        return res.json(data)
    })
})

app.get("/report_2/:id/:start/:end", (req,res)=>{
    const airportID =  req.params.id
    const startTime = req.params.start
    const endTime = req.params.end
    // const q =  "SELECT * FROM flight"
    // const q = "SELECT customer.customer_id, user_type, name, address, nic, passport_id from customer join booking on customer.customer_id = booking.customer_id where booking.flight_id = ?"
    //vilash
    const p = `
            SELECT a.name, COUNT(b.booking_id) AS count
            FROM booking as b
            JOIN flight as f ON f.flight_id = b.flight_id
            JOIN route as r ON f.route_id = r.route_id
            JOIN airport as a ON a.airport_code = r.destination
            WHERE r.destination = ? AND f.departure_time > ? AND f.arrival_time < ? ;  
            `;
    db.execute(p,[airportID,startTime,endTime],(err,data)=>{
        if(err) return console.log(err)
        return res.json(data)
    })
})


app.get("/report_3/:start/:end", (req,res)=>{
    const startTime = req.params.start
    const endTime = req.params.end
 
    const p = `
        SELECT COUNT(CASE WHEN c.user_type = 'reg' THEN c.customer_id END) AS count1, 
            COUNT(CASE WHEN c.user_type = 'guest' THEN c.customer_id END) AS count2
        FROM customer as c
        JOIN booking as b ON c.customer_id = b.customer_id
        JOIN flight as f ON f.flight_id = b.flight_id
        WHERE f.departure_time > ? AND f.arrival_time < ?;  
    `;
    db.execute(p,[startTime,endTime],(err,data)=>{
        if(err) return console.log(err)
        return res.json(data)
    })
})


app.get("/report_4/:origin/:destination", (req,res)=>{
    const origin = req.params.origin
    const destination = req.params.destination
 
    const p = `
        SELECT f.flight_id, a.call_sign ,f.departure_time,f.arrival_time,f.delay, COUNT(b.booking_id) AS total_booking_amount
        FROM flight as f
        JOIN route as r ON f.route_id = r.route_id
        JOIN aircraft as a ON a.aircraft_id = f.aircraft_id
        LEFT JOIN booking as b ON b.flight_id = f.flight_id
        WHERE r.origin = ? AND r.destination = ? AND f.status = "ARRIVED"
        GROUP BY f.flight_id;  
    `;
    db.execute(p,[origin,destination],(err,data)=>{
        if(err) return console.log(err)
        return res.json(data)
    })
})


app.get("/report_5", (req,res)=>{

    const p = `
    SELECT
        am.model_id,
        am.brand,
        am.model,
        SUM(b.total_cost) AS total_revenue
    FROM
        booking b
    INNER JOIN flight f ON b.flight_id = f.flight_id
    INNER JOIN aircraft a ON f.aircraft_id = a.aircraft_id
    INNER JOIN aircraft_model am ON a.model_id = am.model_id

    GROUP BY
        am.model_id,
        am.brand,
        am.model;
    `;
    db.execute(p,(err,data)=>{
        if(err) return console.log(err)
        return res.json(data)
    })
})





/**
 * Seats Selecting
 */
app.get("/seat_select/:flight_id/:customer_id", (req,res)=>{
    const flightId = req.params.flight_id
    const q = "select seat_id, seat_number, seat_class, availability from seat where flight_id = ?"
    db.execute(q, [flightId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/seat_select/:seat_id/:flight_id/:customer_id", (req,res)=>{
    const seatId = req.params.seat_id
    const customerId = req.params.customer_id
    const flightId = req.params.flight_id

    const values = [
        Number(customerId),
        Number(flightId),
        Number(seatId)
    ];
    

    const q2 = "INSERT INTO booking (`customer_id`,`flight_id`,`seat_id`) VALUES (?);";
    db.execute(q2,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });

    
});

app.put("/seat_select/:seat_id", (req,res)=>{
    const seatId = req.params.seat_id
    const q = "UPDATE seat SET `availability`= 0 where seat_id = ?;";
    db.execute(q,[seatId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.get("/booking/:seat_id", (req,res)=>{
    const seatId = Number(req.params.seat_id)
  
    
    const q = "SELECT booking_id FROM booking WHERE seat_id = ?"
    db.execute(q,[seatId],(err,data)=>{
        // res.json(q)
        if(err) return res.json(err)
        return res.json(data)
    })
})





/**
 * Shedule
 */
app.get("/shedule", (req,res)=>{
    const q = "select a.call_sign, r.origin, r.destination, f.departure_time, f.arrival_time, f.status, f.delay from flight as f join route as r on r.route_id = f.route_id join aircraft as a on a.aircraft_id = f.aircraft_id WHERE f.valid = 1 AND f.arrival_time > CURRENT_TIMESTAMP() ORDER BY DATE(f.departure_time) DESC"
    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})





/**
 * Booking
 */
//displaying airport locations
app.get("/location/airports", (req,res)=>{
    const q = "SELECT name, airport_code FROM airport WHERE valid = 1"
    db.execute(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
});
// flights filtering by booking
app.get("/route/available_flights/:origin/:destination/:departure/:arrival", (req, res) => {
    console.log(req.params);
    const originLocationId = req.params.origin;
    const destinationLocationId = req.params.destination;
    const departureTime = req.params.departure;
    const arrivalTime = req.params.arrival;

    console.log(originLocationId,destinationLocationId,departureTime,arrivalTime);
    const q = `
        SELECT DISTINCT flight.flight_id, call_sign, origin, destination, departure_time, arrival_time, flight.status, delay
        FROM flight
        INNER JOIN route ON flight.route_id = route.route_id
        INNER JOIN aircraft ON flight.aircraft_id = aircraft.aircraft_id
        WHERE origin = ? AND destination = ? AND
        departure_time >= ? AND arrival_time <= ?;
    `;
    db.execute(q, [originLocationId, destinationLocationId, departureTime, arrivalTime], (err, data) => {
        // if (err) return res.json(err);
        // return res.json(data);
        if (err) return console.log(err);
        return res.json(data);
    });
});



// Get rows related to a specific route by route_id
app.get("/route/:route_id", (req, res) => {
    const route_id = req.params.route_id;  //input variable to get flight relating to selected route in future

    const sql = "SELECT * FROM flight WHERE flight.flight_id = ? AND flight.departure_time > CURDATE() AND valid = 1";

    db.execute(sql, [route_id], (err, rows) => {
        if (err) return res.json(err);
        return res.json(rows);
    });
});


/**
 * Membership 
 */

app.get("/membership", (req,res)=>{
    const q = "SELECT * FROM membership"
    db.execute(q,(err,data)=>{
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

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


/**
 * Registered User
 */

app.get("/user", (req,res)=>{
    const q = "SELECT * FROM registered_user"
    db.execute(q,(err,data)=>{
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

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});




/**
 * Customer form for guest user booking
*/

app.post("/guest", (req,res)=>{
    const q = "INSERT INTO customer(`user_type`,`name`,`date_of_birth`,`address`, `nic`,`passport_id`) VALUES (?);";
    const values = [
        "guest",
        req.body.name,
        req.body.date_of_birth,
        req.body.address,
        req.body.nic,
        req.body.passport_id,
    ];

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

// app.get("/guest_get_id/:name/:dob/:address/:nic/:pid", (req,res)=>{
//     const name = req.params.name
//     const dob = req.params.dob
//     const address = req.params.address
//     const nic = req.params.nic
//     const pid = req.params.pid
    
//     const q = "SELECT customer_id FROM customer WHERE name = ? AND date_of_birth = ? AND address = ? AND nic = ? AND passport_id = ?"
//     db.execute(q,[name,dob,address,nic,pid],(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })



app.post("/user_passenger", (req,res)=>{
    const q = "INSERT INTO customer(`user_type`,`name`,`date_of_birth`,`address`, `nic`,`passport_id`) VALUES (?);"
    // and should create a user passenger instance with user_id and customer_id
    const values = [
        "guest",
        req.body.name,
        req.body.date_of_birth,
        req.body.address,
        req.body.nic,
        req.body.passport_id,
    ];

    db.execute(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});


app.get("/customer_booking/:id",(req,res)=>{
    const cusId = req.params.id
    const q = `SELECT r.origin, r.destination, f.departure_time, f.arrival_time, b.booking_id, s.seat_class, s.seat_number, b.flight_id, b.customer_id, c.name, c.nic, c.passport_id, a.call_sign
                FROM booking as b 
                JOIN flight as f on f.flight_id = b.flight_id
                Join customer as c on c.customer_id = b.customer_id 
                join route as r on r.route_id = f.route_id
                join seat as s on s.seat_id = b.seat_id
                join aircraft a on a.aircraft_id = f.aircraft_id
                WHERE b.booking_id = ?`
    db.query(q,[cusId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.listen(8000, ()=>{
    console.log("Connected to the backend . . .")
});