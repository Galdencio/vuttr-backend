const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/vuttr',
    { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

module.exports = mongoose;