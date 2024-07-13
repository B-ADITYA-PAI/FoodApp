const express = require('express');
const router = express.Router();



router.post('/foodData', async (req, res) => {
    try {
        // console.log( JSON.stringify(global.foodData))
        // const userId = req.user.id;
        // await database.listCollections({name:"food_items"}).find({});
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})


module.exports=router;