const fs = require('fs');
const { filterByQuery, findById, createNewZookeeper, validateZookeeper} = require('../lib/zookeepers.js');
const {zookeepers} = require('../data/zookeepers');

jest.mock('fs');

test('Should create a new zookeeper object', () => {
    // create new zookeeper object then add to zookeepers.json
    const zookeeper = createNewZookeeper(
        {id: "5", name: "Snooki", age: "30", favoriteAnimal: "Iguana"}, zookeepers
    );

    expect(zookeeper.name).toBe("Snooki");
    expect(zookeeper.id).toBe("5");
    expect(zookeeper.age).toBe("30");
    expect(zookeeper.favoriteAnimal).toBe("Iguana");


});

test("Should filter a zookeeper/'s by a query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Pauly D",
            age: 24,
            favoriteAnimal: "koala",
        },
        {
            id: "4",
            name: "Vinny",
            age: 27,
            favoriteAnimal: "pig",
        }
    ];

    const updatedZookeepers = filterByQuery({name: "Pauly D" }, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test('Should find zookeeper by id', () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Pauly D",
            age: "24",
            favoriteAnimal: "koala",
        },
        {
            id: "4",
            name: "Vinny",
            age: "27",
            favoriteAnimal: "pig",
        }
    ];

    const updatedZookeepers = findById("4", startingZookeepers);
    expect(updatedZookeepers.name).toEqual("Vinny");
});



test('Should validate zookeeper attributes', () => {
    const zookeeper = {
        id: '3',
        name: 'Pauly',
        age: 24,
        favoriteAnimal: 'koala',
    };

    const invalidZookeeper = {
        id: '4',
        name: 'Vinny',
        age: '27',
        favoriteAnimal: 'monkey',
    };

    const result1 = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
   

});

