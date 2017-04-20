// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var scientistSchema = new Schema({
  uri: String,
  label: String,
  thumbnail: String,
  description: String,
  birthDate: String,
  deathDate: String,
  birthPlace_label: [String],
  deathPlace_label: [String],
  field_label: [String],
  doctoralAdvisor_label: [String],
  academicAdvisor_label: [String],
  knownFor_label: [String],
  spouse_label: [String],
  award_label: [String],
  citizenship_label: [String],
  almaMater_label: [String],
  residence_label: [String],
  influenced_label: [String]
});

// the schema is useless so far
// we need to create a model using it
var Scientist = mongoose.model('Scientist', scientistSchema);

// make this available to our users in our Node applications
module.exports = Scientist;
