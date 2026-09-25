import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.json())

// Sample API route
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Node.js backend!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//app.post('/api/measure', (req, res) => {
//  res.json({ message: `Received ${req.body.speed}` });
//});

const g = 9.80665; // standard gravity in m/s/s
const k_dry = 0.9; // friction coefficient on dry asphalt
const sand = 0.55; // friction coefficient on asphalt covered in sand
const wet = 0.45; // friction coefficient on wet asphalt
const snow = 0.25; // friction coefficient asphalt covered in snow
const ice = 0.1; // friction coefficient on black ice

app.post('/api/measure', (req, res) => {
    let a = 8.0; // temp hardcoded value
    let t = 1.35; // temp hardcoded value
    // Extract speed and incline from req.body and ensure it's a number
    const speed = parseFloat(req.body.speed);
    //const _incline = parseFloat(req.body.incline);

    if (isNaN(speed)) {
        return res.status(400).json({ error: 'Invalid speed value provided' });
    }

    /*if (isNaN(_incline)) {
        return res.status(400).json({ error: 'Invalid incline value provided' });
    }*/

    // Automatically set v based on the request
    let v = kmh_to_ms(speed);

    // Perform any physics calculations using v here...
    console.log(`v = ${v}`);
    console.log(`a = ${a}`);
    console.log(`t = ${t}`);
   // console.log(`incline = ${_incline}`)
    res.json({ message: `Droga zatzymania: ${display_stopping_distance(v, a, t)} m` });
});

//let v = kmh_to_ms(100.0); // temp hardcoded value
//let a = 8.0; // temp hardcoded value
//let t = 1.35; // temp hardcoded value

// converts km/h to m/s
function kmh_to_ms(v) {
    return (1000 * v) / 3600;
}
// converts m/s to km/h
function ms_to_kmh(v) {
    return v * 1000 * 3600;
}

// converts fraction of g to m/s^2
function g_to_ms2(ag) {
    return ag * g;
}

// converts m/s^2 to fraction of g
function ms2_to_g(a) {
    return a / g;
}



// v - speed in m/s
// a - deceleration in m/s/s (do not use negative values)
function braking_distance(v, a) {
    return (v * v) / (2 * a);
}

// v - speed in m/s
// t - total reaction time in seconds
// returns reaction distance in meters
function reaction_distance(v, t) {
    return v * t;
}

// v - speed in m/s
// a - deceleration in m/s/s (do not use negative values)
// t - total reaction time in seconds
function stopping_distance(v, a, t) {
    return reaction_distance(v, t) + braking_distance(v, a);
}

// F - total braking force in Newtons
// m - total mass in kg
// returns deceleration in m/s/s
function calculate_deceleration(F, m) {
    return F / m;
}

// v - speed in m/s
// a - deceleration in m/s/s on a level road with dry surface (do not use negative values) 
// t - total reaction time in seconds
// k - friction coefficient (0.9 for dry surface)
// incline - incline in slope % (positive = car goes up)
// returns stopping distance rounded up
function display_stopping_distance(v, a, t, k = 0.9, incline = 0.0) {
    a = a / 0.9;
    a = a * k;
    a = a - g * Math.sin(Math.atan(incline / 100)); // todo: check if this is correct
    console.log(`after deceleration calculation: a = ${a}`);
    console.log(`reaction distance = ${reaction_distance(v, t)}`);
    console.log(`braking distance = ${braking_distance(v, a)}`);

    return Math.ceil(stopping_distance(v, a, t));
}

