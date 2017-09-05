const mongoose = require('mongoose');
const Cou = mongoose.model('Cou');

module.exports  = (app) => {
  app.get('/cou', async (req, res) => {
    const cous = await Cou.find().sort({ createdAt: -1}).exec();   
    return res.json(cous);  
  });

  app.post('/cou', async (req, res) => {
    const cou = new Cou(req.body);
    await cou.save();
    return res.json(cou);
  });

  app.delete('/cou/:couId', async (req, res) => {
    const { id } = req.params;

    await Cou.remove({ id });
    return res.json({
      removedId: id,
      result: 'ok'
    });
  });
};