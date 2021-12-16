const fs = require('fs');
const { filterByQuery, findById, createNewAnimal, validateAnimal} = require('../lib/animals');
const {animals} = require('../data/animals.json');
const res = require('express/lib/response');

// added so createNewAnimal does not add tested animal to animals.json 
jest.mock('fs');

test("Should create a new animal object", () =>{
    const newAnimal = createNewAnimal(
        {name: "Tony", id: "24omaha"}, animals
    );

    expect(newAnimal.name).toBe("Tony");
    expect(newAnimal.id).toBe("24omaha");

});

test("should filter results by query", () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ['quirky', 'rash'],
        },
        {
            id: "4",
            name: "Jennifer",
            species: "giraffe",
            diet: "herbivore",
            personalityTraits: ['tall', 'sassy','brave'],
        }
    ];
    const updatedAnimals = filterByQuery({species: "gorilla" }, startingAnimals);

    expect(updatedAnimals.length).toEqual(1);
});

test("should find animal by id number", () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ['quirky', 'rash'],
        },
        {
            id: "4",
            name: "Jennifer",
            species: "giraffe",
            diet: "herbivore",
            personalityTraits: ['tall', 'sassy','brave'],
        }
    ];

    const result = findById("3", startingAnimals);
    expect(result.name).toBe("Erica");
});

test("Should validate animal attributes", () => {
    const animal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ['quirky', 'rash'],
    };
    const invalidAnimal = {
        id: "4",
        name: "Jennifer",
        species: "giraffe",
        diet: "herbivore",
        
    };

    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});