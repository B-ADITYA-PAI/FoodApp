const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://ADITYA:oa8klkNzaRm6zsQr@cluster0.bk8js36.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";



const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        const fetched_data = mongoose.connection.db.collection("food_items");
        const food_items = await fetched_data.find({}).toArray();

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const foodCategory_data = await foodCategory.find({}).toArray();

        global.food_items = food_items;
        global.foodCategory = foodCategory_data;


    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
};

module.exports = mongoDB;




