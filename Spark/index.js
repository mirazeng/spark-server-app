export default function Spark(app) {
    app.get("/spark/welcome", (req, res) => {
        res.send("Welcome to Spark");
    });
};