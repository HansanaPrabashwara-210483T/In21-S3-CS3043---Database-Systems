import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({path: "./jwt_secret.env"});


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


/** 
 * For logging in. Authenticates a provided username and password against
 * those present in the database. If alright, sends 200 OK status code and JSON
 * with the access_token and user information. If not, sends 401 Unauthorized
 * or if there is a server error, 500 Internal Server Error.
 * Calls two stored procedures in the database: `GetHashedPass()` and `LoginUser()`.
 */
const login = async (req, res) => {
    const username = req.body.Username;
    const plain_password = req.body.Password;

    // Fetching the hashed password stored in the database using stored procedure
    // Uses Promise.
    const hashed_password = await new Promise((resolve, reject) => {
        db.execute("CALL GetHashedPass(?, @hashed_pass);", [username], (error, results, fields) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else {
                db.execute("SELECT @hashed_pass;", (error, inner_results, fields) => {
                    if (error) {
                        console.log(error);
                        //res.json(error);
                        //res.status(500).json({message: error.message || "Database Server Error!"});
                        reject(error);
                        return;
                    } else {
                        const hashed_password = inner_results[0]['@hashed_pass'];
                        resolve(hashed_password);
                    }
                });
                console.log('Successful!');
            }
        });
    });
    

    // Comparing hashed password with plaintext password
    var same = false;
    if (hashed_password) {
        // Since `compare` is async, we wait...
        same = await bcrypt.compare(plain_password, hashed_password);

    } else {
        // Means there is no user with provided username
        res.status(401).json({message: "Invalid username or password!"});
        return;
    }

    if (same) {
        // Passwords are the same
        var user = null;
        const access_token = await new Promise((resolve, reject) => {
            db.execute("CALL LoginUser(?)", [username], 
                (error, results, fields) => {
                    if (error) {
                        // console.log(error.message);
                        reject(error);
                        res.status(500).json({message: error.message || "Database Server Error!"});
                    } else {
                        console.log('Logged In!');
                        // LoginUser() procedure returns a table with user info
                        user = {
                            user_id: results[0][0]['user_id'],
                            membership: results[0][0]['membership'],
                            username: results[0][0]['username'],
                            customer_id: results[0][0]['customer_id']
                        }
                        // Set JWT using above information. Ideally, process.env.ACCESS_TOKEN_SECRET
                        // should be read from the env file.. however this does not seem to work (TODO) 
                        const access_token = jwt.sign(user, 'process.env.ACCESS_TOKEN_SECRET', {expiresIn: '1h'});

                        resolve(access_token);
                    }
            });
        });

        // Frontend takes it from here...
        res.status(200).json({token: access_token, user: user });
        
    } else {
        console.log("Passwords don't match");
        res.status(401).json({message: "Invalid username or password!"});
    }

};

/**
 * Function to ensure token is valid and not expired.
 * NOTE: We assume that the JWT is sent via the headers on the request and that
 * it's key name is 'Authorization'. Also, we assume it is in the following format
 * {Authorization: 'Bearer <token>'}
 * The first word 'Bearer' and a space being included seems to be a standard people
 * adhere to when sending the JWT. The explanation I found is that since there 
 * are many types of tokens and when sending they all look similar (just random
 * strings of text/numbers), we usually add a small text at the start to indicate
 * what type of token it is. In our case (JWT), it's a Bearer token.
 */
const verify = (req, res) => {
    // We assume syntax is {Authorization: 'Bearer <token>'}
    const access_token = req.headers.Authorization.split(' ')[1];
    
    if (!access_token) {
        return res.status(401).json({message: "No access token provided.\nPlease login first!"});
    }

    try {
        const decoded = jwt.verify(access_token, 'process.env.ACCESS_TOKEN_SECRET');
        req.user = decoded; // Set decoded information into req so that it can be used by other functions
    } catch (error) {  
        return res.status(401).json({message: "Invalid access token!"});
    }
}


// TODO: this part is to be made... First have to verify whether the current token is
// valid and then proceed with logging out...
const logout = (req, res) => {
    // Invoke verify() to check whether token is valid
    verify (req, res, () => {
        // TODO: take it from here...
        console.log('logging the fellow out!');
        res.status(200).json({message: "Logged out!"});
    });
    // const access_token = req.data.token;
    // const user_id = req.params.user_id;

    //res.status(200).json({message: "Logged out!"});
}

// Not complete
const profile = (req, res) => {
    res.send("Profile page");
}


const authController = {
    register, 
    login,
    profile,
    logout,
};

export default authController;