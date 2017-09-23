import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Type = mongoose.model('Type', {
  id_type: Number,
  name_type: {
    type: String,
    unique: true
  },
  image: String
});

export default Type;