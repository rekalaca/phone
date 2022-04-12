const phones = [
    {
        "id": "1",
        "gyarto": "Huawei",
        "modell": "Mate Pro 21"
    },
    {
        "id": "2",
        "gyarto": "Huawei",
        "modell": "Mate Pro 10"
    }
]

let maxId = 2;

const express = require('express');
const port = 5555;
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const res = require('express/lib/response');
app.use(bodyParser.json());


//Read
app.get('/phones', (req, res) => {
    fs.readFile('./data/phones.json', (err, file) => {
        res.send(JSON.parse(file));
    });
});

//Read by id
app.get('/phones/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./data/phones.json', (err, file) => {
        const phones = JSON.parse(file);
        const phonesById = phones.find(phones => phones.id === id);

        if (!phonesById) {
            res.status(404);
            res.send({ error: `id: ${id} not found` });
            return;
        }
        res.send(phonesById)
    });
});

//Update
app.put('/phones/:id',bodyParser.json(), (req, res) => {
    const id = req.params.id;
    fs.readFile('./data/phones.json', (err, file) => {
        const phones = JSON.parse(file);
        const phonesIndexById = phones.findIndex(phones => phones.id === id);

        if (phonesIndexById === -1) {
            res.status(404);
            res.send({ error: `id: ${id} not found` });
            return;
        }
        const updatedPhone = {
            id: req.body.id,
            gyarto: req.body.gyarto,
            modell: req.body.modell,
        };

        phones[phonesIndexById] = updatedPhone;
        fs.writeFile('./data/phones.json', JSON.stringify(phones), () => {
            res.send(updatedPhone);
        })
        
    });
});

//Delete
app.delete('/phones/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./data/phones.json', (err, file) => {
        const phones = JSON.parse(file);
        const phonesIndexById = phones.findIndex(phones => phones.id === id);

        if (phonesIndexById === -1) {
            res.status(404);
            res.send({ error: `id: ${id} not found` });
            return;
        }
        phones.splice(phonesIndexById, 1);
        fs.writeFile('./data/phones.json', JSON.stringify(phones), () => {
            res.send({id:id});
        })
        
    });

})

/* app.post('/phones', bodyParser.json(), (req, res) => {
    const newPhone = {
        id: req.body.id,
        gyarto: req.body.gyarto,
        modell: req.body.modell,
    };

    fs.readFile('./data/phones.json', (err, file) => {
        const phones = JSON.parse(file);
        phones.push(newPhone);
        fs.writeFile('./data/phones.json', JSON.stringify(phones), (err) => {
            res.send(newPhone);
        })
    })
});


const getPhones = (q, res, next) => {
    return res.json(phones);
}


const getOnePhone = (q, res, next) => {
    return next();
}

const addNewPhone = (req, res, next) => {
    if (typeof req.body.modell == 'undefined' || typeof req.body.gyarto == 'undefined') {
        return res.status(400).json({ 'Error': 'Missing datas' });
    }
    maxId++;
    const newPhone = {
        id: maxId,
        gyarto: req.body.gyarto,
        modell: req.body.modell
    }
    phones.push(newPhone);
    return res.json(newPhone);
}
const deletePhone = (q, res, next) => {
    return next();
}
const updatePhone = (q, res, next) => {
    return next();
}
const searchPhone = (q, res, next) => {
    return next();
}


app.get("/phone", getPhones);
app.get("/phone/:pid", getOnePhone);
app.put("/phone", addNewPhone);
app.delete("/phone/:pid", deletePhone);
app.patch("/phone/:pid", updatePhone);
app.post("/phone/search", searchPhone); */

app.listen(port, () => {
    console.log(`A szerver elindult a ${port} porton.`)
})