const express = require('express');
const db = require('./DB'); // Adjust path based on your folder structure
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Example API endpoint fetching users from PostgreSQL
app.get('/api/users', async (req, res) => {
    // console.log("running GetUsers")
    try {
        const result = await db.query('SELECT * FROM users ORDER BY id ASC');
        res.status(209).json(result.rows);
        console.log(res)
    } catch (error) {
        console.error('Database connection error:', error.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/SignUp', async (req, res) => {
    console.log("starting Signup")
    const  {name,password} = req.body
    console.log(name)
    console.log(password)
    try {
        const result = await db.query(`insert into users (name,password) 
            values 
            ($1, $2); `,[name,password])
        
        res.status(201).json({message: "Great Success"})
    }catch (err){
        res.status(500).json({message: "Error during SignUp"})
    }
})

app.get('/api/SignIn/:userName/:password', async (req, res) => {
    // console.log("running getSignIn")
    const {userName,password} = req.params
    try {
        const result = await db.query('SELECT id,name FROM users where name = $1 and password = $2',[userName,password]);
        res.status(209).json(result.rows);
        // console.log(result)
    } catch (error) {
        console.error('Database connection error:', error.stack);
        res.status(500).json({ error: 'SignIn error' });
    }
});

app.get('/api/GetPeople/:userId', async (req, res) => {
    // console.log("running getPeople")
    const {userId} = req.params
    try {
        const result = await db.query('SELECT person_id,name FROM person where created_by = $1',[userId]);
        res.status(209).json(result.rows);
        // console.log(result)
    } catch (error) {
        console.error('Database connection error:', error.stack);
        res.status(500).json({ error: 'GetPeople error' });
    }
});

app.get('/api/GetPersonCount/:userId', async (req, res) => {
    // console.log("running getPersonCount")
    const {userId} = req.params
    try {
        const result = await db.query('select count(created_by) from person where created_by = $1;',[userId]);
        res.status(209).json(result.rows);
        // console.log(result)
    } catch (error) {
        console.error('Database connection error:', error.stack);
        res.status(500).json({ error: 'GetPersonCount error' });
    }
});


app.get('/api/GetQuoteCount/:userId', async (req, res) => {
    // console.log("running getQuoteCount")
    const {userId} = req.params
    try {
        const result = await db.query('select count(creator_id) from quote_head where creator_id = $1;',[userId]);
        res.status(209).json(result.rows);
        // console.log(result)
    } catch (error) {
        console.error('Database connection error:', error.stack);
        res.status(500).json({ error: 'GetQuoteCount error' });
    }
});

app.get('/api/GetQuotesByPeople/:userId', async (req, res) => {
    // console.log("running getQuoteCount")
    const {userId} = req.params
    // console.log(userId)
    try {
        const result = await db.query('select name, count from stats_by_person where created_by = $1 limit 15;',[userId]);
        res.status(209).json(result.rows);
        // console.log(result)
    } catch (error) {
        console.error('Database connection error:', error.stack);
        res.status(500).json({ error: 'GetQuoteCount error' });
    }
});

app.get('/api/GetRandomQuote/:userId', async (req, res) => {
    // console.log("running getQuoteCount")
    const {userId} = req.params
    // console.log(userId)
    try {
        const result = await db.query('select * from getRandomQuote($1);',[userId]);
        res.status(209).json(result.rows);
        // console.log(result)
    } catch (error) {
        console.error('Database connection error:', error.stack);
        res.status(500).json({ error: 'GetQuoteCount error' });
    }
});

app.post('/api/AddPerson', async (req, res) => {
    // console.log("starting AddPerson")
    const  {name,created_by} = req.body
    try {
        const result = await db.query(`insert into person (name,created_by) 
            values 
            ($1, $2); `,[name,created_by])
        
        res.status(201).json({message: "Great Success"})
    }catch (err){
        console.error('Database connection error:', err.stack);
        res.status(503).json({message: "Error during AddPerson"})
    }
})

app.post('/api/AddQuote', async (req, res) => {
    // console.log("starting AddQuote")
    const  {lines,people,created_by,date} = req.body
    try {
        const result = await db.query(`call addQuote($1::varchar(255)[], $2::varchar(255)[], $3::int, $4::date); `,[lines,people,created_by,date])
        // console.log(result)
        
        res.status(201).json({message: "Great Success"})
    }catch (err){
        console.error(err)
        res.status(500).json({message: "Error during AddQuote"})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});