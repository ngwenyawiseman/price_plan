import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Connect to the SQLite database
const db = await sqlite.open({
    filename: './data_plan.db',
    driver: sqlite3.Database
});
console.log("Connected to SQLite database");
await db.migrate();

// Endpoint to create a new price plan
app.post('/api/price_plan/create', async (req, res) => {
    const { plan_name, sms_price, call_price } = req.body;
    const existingPlan = await db.get("SELECT * FROM price_plan WHERE plan_name = ?", plan_name);

    if (existingPlan) {
        return res.status(400).json({ error: "Price plan already exists." });
    }

    await db.run("INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES (?, ?, ?);", 
        [plan_name, sms_price, call_price]);

    res.json({ status: `Successfully created the ${plan_name} plan` });
});

// Endpoint to update an existing price plan
app.post('/api/price_plan_update', async (req, res) => {
    const { plan_name, sms_price, call_price } = req.body;
    const plan = await db.get("SELECT * FROM price_plan WHERE plan_name = ?", plan_name);

    if (!plan) {
        return res.status(400).json({ error: `Plan name ${plan_name} doesn't exist` });
    }

    await db.run(`UPDATE price_plan SET sms_price = ?, call_price = ? WHERE plan_name = ?`,
        sms_price, call_price, plan_name);

    res.json({ status: `Successfully updated the plan ${plan_name}` });
});

// Endpoint to delete a price plan
app.post('/api/price_plan/delete', async (req, res) => {
    const { plan_name } = req.body;
    const found = await db.get("SELECT * FROM price_plan WHERE plan_name = ?", plan_name);

    if (!found) {
        return res.status(400).json({ error: `Price plan ${plan_name} doesn't exist` });
    }

    await db.run("DELETE FROM price_plan WHERE plan_name = ?", plan_name);
    res.json({ status: `Successfully deleted the ${plan_name} plan` });
});

// Endpoint to calculate phone bill
app.post('/api/phonebill', async (req, res) => {
    const { price_plan, actions } = req.body;
    const plan = await db.get("SELECT sms_price, call_price FROM price_plan WHERE plan_name = ?", price_plan);

    if (!plan) {
        return res.status(400).json({ error: `Invalid price plan name: ${price_plan}` });
    }

    const activities = actions.split(",").map(action => action.trim());
    let total = 0;

    activities.forEach(action => {
        if (action === 'sms') {
            total += plan.sms_price;
        } else if (action === 'call') {
            total += plan.call_price;
        }
    });

    res.json({ total: `R${total.toFixed(2)}` });
});

// Endpoint to fetch all price plans
app.get('/api/price_plan', async (req, res) => {
    const price_plans = await db.all("SELECT * FROM price_plan");
    res.json({ price_plans });
});

const PORT = 4011;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
