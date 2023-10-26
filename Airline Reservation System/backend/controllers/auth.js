import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// Sign-up page submitted information lands here
const register = async (req, res) => {
    const body = req.body;
    var dob = '';

    // Output of MUI datepicker is similar to 2000-03-31T18:00:00.000Z
    // which cannot be sent to MySQL which expects 2000-03-31. Hence we split
    // the above by 'T' and take the first part.
    if (body.Dob) {
        dob = body.Dob.split('T')[0];
    }

    // Hashing and salting are BOTH done using the below. We've set it for 
    // 8 rounds of hashing to happen.
    let hashedPassword = await bcrypt.hash(body.Password, 8);

    // Calls the `InsertNewUser()` stored procedure on our database.
    // If there is an error, it currently logs to the console, but ideally, should
    // let user know if the error can be corrected by the user (for example
    // non-unique username...)
    db.execute('CALL InsertNewUser(?,?,?,?,?,?,?,?,?);', 
        ['reg', body.Name, dob, body.Address, body.Nic, body.Passport_Id, 'R', body.Username, hashedPassword], (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results);
      });

    // Sent to the frontend signup.jsx page on successful completion of this function.
    res.send('Registerment in progress');
}


// Not complete
const login = (req, res) => {
    res.send("Logging the fellow in...");
};


// Not complete
const profile = (req, res) => {
    res.send("Profile page");
}

const authController = {
    register, 
    login,
    profile,
};

export default authController;