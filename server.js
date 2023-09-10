const Envelope = require('./models/Envelope');

const express = require('express');
const app = express();
const envelopeRouter = express.Router();
app.use('/envelopes', envelopeRouter);

const bodyparser = require('body-parser');
envelopeRouter.use(bodyparser.json());

module.exports = app;

const PORT = process.env.PORT || 5500;

//GET ALL ENVELOPS
envelopeRouter.get('', async (req,res,next) => {
    try {
        const envelopes = await Envelope.findAll();
        res.status(200).json({envelopes: envelopes[0]});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//CREATE A NEW ENVELOP AND ADD IT TO THE DATABASE
envelopeRouter.post('', async (req,res,next) => {
    try {
        let {title, budget} = req.body;
        let envelope = new Envelope(title,budget);
        envelope = await envelope.save();
        res.status(200).json({message: "envelope created"});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
    
})

//GET A SPECIFIC ENVELOP BY ID
envelopeRouter.get('/:id', async (req,res,next) => {
    try {
        let id = req.params.id;
        let envelope = await Envelope.findById(id);
        res.status(200).json({envelope: envelope[0]});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

//UPDATE AN ENVELOP
envelopeRouter.put('/:id', async (req,res,next) => {
    try {
        let id = req.params.id;
        let {title, budget} = req.body;
        let envelope = await Envelope.update(id,title,budget);
        res.status(200).json({message: "envelope updated", envelope: envelope[0]});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

//DELETE AN ENVELOP
envelopeRouter.delete('/:id', async (req,res,next) => {
    try {
        let id = req.params.id;
        await Envelope.delete(id);
        res.status(200).json({message: "envelope deleted"});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

//TRANSFER MONEY FROM AN ENVELOP TO ANOTHER
envelopeRouter.put('/:id1/:id2', async (req, res, next) => {
    try {
        let {id1, id2} = req.params;
        let envelope = await Envelope.transfer(id1,id2,500);
        res.status(200).json({message: "transfer done", envelope: envelope[0]});
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})


app.listen(PORT, () => {
    console.log(`You are listening on port ${PORT}`)});
