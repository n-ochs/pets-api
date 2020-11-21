var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get('/api/owners', (req, res) => {
    res.status(200).send(owners);
});

// GET /api/owners/:id
app.get('/api/owners/:id', (req, res) => {
    const ownerId = req.params.id;

    let thisOwner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    res.status(200).send(thisOwner);
});

// POST /api/owners
app.post('/api/owners', (req, res) => {
    let newId = owners.length;

    owners.push({
        id: newId + 1,
        name: req.body.name,
        pets: req.body.pets
    });

    res.status(200).send({
        message: 'Owner added successfully'
    })
});

// PUT /api/owners/:id
app.put('/api/owners/:id', (req, res) => {
    const ownerId = req.params.id;

    let thisOwner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    let ownerIndex = owners.findIndex((owner) => {
        return owner === thisOwner;
    });

    owners[ownerIndex] = req.body;
    res.status(200).send(owners[ownerIndex]);
});

// DELETE /api/owners/:id
app.delete('/api/owners/:id', (req, res) => {
    const ownerId = req.params.id;

    let thisOwner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });
    
    let ownerIndex = owners.findIndex((owner) => {
        return owner === thisOwner;
    });

    if(ownerIndex > -1) {
        owners.splice(ownerIndex, 1);
        res.status(200).send(owners);
    }
    else {
        res.status(200).send({
            message: 'Owner not found'
        });
    }
});

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', (req, res) => {
    const ownerId = req.params.id;

    let thisOwner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });
    
    let ownerIndex = owners.findIndex((owner) => {
        return owner === thisOwner;
    });

    if(ownerIndex > -1) {
        res.status(200).json(
        owners[ownerIndex].pets
        )
    }
    else {
        res.status(200).send({
            message: 'Owner not found'
        });
    };
});

// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', (req, res) => {
    const ownerId = req.params.id;
    const petId = req.params.petId;

    let thisOwner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    let thisPet = thisOwner.pets.find((pet) => {
        return Number(pet.id) === Number(petId);
    });

    res.status(200).send(thisPet);
});

// POST /api/owners/:id/pets
app.post('/api/owners/:id/pets', (req, res) => {
    const ownerId = req.params.id;

    let thisOwner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    thisOwner.pets.push({
        id: thisOwner.pets.length + 1,
        name: req.body.name,
        type: req.body.type
    });

    res.status(200).send({
        message: `Pet successfully added to ${thisOwner.name}'s pets`
    });
});

// PUT /api/owners/:id/pets/:petId
app.put('/api/owners/:id/pets/:petId', (req, res) => {
    const ownerId = req.params.id;
    const petId = req.params.petId;

    let thisOwner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    let ownerIndex = owners.findIndex((owner) => {
        return owner === thisOwner;
    });

    let thisPet = thisOwner.pets.find((pet) => {
        return Number(pet.id) === Number(petId);
    });

    let petIndex = thisOwner.pets.findIndex((pet) => {
        return Number(pet.id) === Number(petId);
    });

    owners[ownerIndex].pets[petIndex] = req.body;
    res.status(200).send(owners[ownerIndex].pets[petIndex]);
});

// DELETE /api/owners/:id/pets/:petId
app.delete('/api/owners/:id/pets/:petId', (req, res) => {
    const ownerId = req.params.id;
    const petId = req.params.petId;

    let thisOwner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    let thisPet = thisOwner.pets.find((pet) => {
        return Number(pet.id) === Number(petId);
    });

    let petIndex = thisOwner.pets.findIndex((pet) => {
        return Number(pet.id) === Number(thisPet.id)
    });

    if(petIndex > -1) {
        thisOwner.pets.splice(petIndex, 1)
        res.status(200).send(thisOwner);
    };
});



app.listen(3000, () => {
    console.log('Pets API is now listening on port 3000...');
});