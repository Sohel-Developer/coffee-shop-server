const express = require('express')
const app = express()
require('dotenv').config()
var cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

/* Middelware */

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iyhhy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect(() => {
            if (err) {
                console.error(err);
                return
            }
        });


        const coffeeCollection = client.db("coffeeDB").collection("coffees");

        app.get('/coffee', async (req, res) => {
            const query = {};

            const result = await coffeeCollection.find(query).toArray();
            res.send(result)
        })


        app.get('/coffee/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: new ObjectId(id) };
            const result = await coffeeCollection.findOne(query);

            res.send(result)
        })



















        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
























app.get('/', (req, res) => {
    res.send('Coffee Shop Server Running.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})