const db = require("./models");
const Person = db.person;

// Create and Save
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Person
  const person = new Person({
    name: req.body.name,
  });

  // Save Person in the database
  person
    .save(person)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
      });
    });
};

// Find a single Person with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Person.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Person with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Person with id=" + id });
    });
};

// Retrieve all 
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Person.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Persons."
        });
      });
};
