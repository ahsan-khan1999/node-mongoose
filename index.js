const mongoose = require('mongoose');

const dishes = require('./models/dishes');

const url ='mongodb://localhost:27017/Readme';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('COnnected Sucessfully to DB')

    var newDish = dishes({
        name : "Pizza Fries",
        description: "Big Bash"
    });

    newDish.save()
    .then((dish) => {
        console.log(dish);

        return dishes.find({}).exec();
    })
    .then((dishe) => {
        console.log('found' , dishe)
        return dishes.deleteOne({});
    })
    .then(() =>{
        return mongoose.connection.close();

    })
    .catch((err) => console.log(err))
})
