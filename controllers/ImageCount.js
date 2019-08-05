const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a374d1e25cb7448bbf5517bcbb5899ad'
  });


const handleApiCall = (req, res) => {
    const {input} = req.body;
   app.models
  .predict(Clarifai.FACE_DETECT_MODEL, input)
  .then(data => res.json(data))
  .catch(err => res.status(400).json('Error Occured'))
}  


const handleImageCount =  (req, res, db) => {
    const {id} = req.body;

    db('users')
    .where('id','=', id)
    .increment('entries',1)
    .returning('entries')
    .then(data => res.json(data))
    .catch(err => {
        res.status(400).json('Error occured!') 
        console.log(err)
    });
}

module.exports ={
    handleImageCount, 
    handleApiCall
};