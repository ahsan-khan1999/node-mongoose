const mongoose = require('mongoose');

const dishes = require('./models/dishes');

const url ='mongodb://localhost:27017/Readme';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('COnnected Sucessfully to DB')

    dishes.create({
        name : "Pizza  bash",
        description: "Big Bash"
    })
    .then((dish) => {   
        console.log(dish);

        return dishes.findByIdAndUpdate(dish._id , {
            $set:{description: 'updated Dish'}

        },{
            new:true
        }).exec();
    })
    .then((dish) => {
        console.log('found' , dish)
        dish.comments.push({
            rating:5,
            comment:'Hello I am Ahsan Its wonderful',
            author: 'Ahsan Khan'
        });
        return dish.save();
    })
    .then((dish) => {
        console.log('Deleteing here',dish)
        return dishes.deleteOne({});
    })
    .then(() =>{
        return mongoose.connection.close();

    })
    .catch((err) => console.log(err))
})
