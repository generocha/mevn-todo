const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://<db name>:<pass>v@cluster0-la1iw.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('<db name>').collection('<collection name>')
}

module.exports = router;