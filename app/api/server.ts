import express from "express";
import userRoutes from "./route/route-user";

const app = express();
const PORT = 3000;

process.stdout.write("Message\n");

app.get('/xd', (req, res) => {
    console.log("Request received at /xd");
    console.log(`Request method: ${req.method}`);
    console.log(`Request path: ${req.path}`);
    res.send('Got a GET request');
});

app.use(express.static('public'));

app.use("/user", userRoutes);
console.log("User routes loaded.");

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;