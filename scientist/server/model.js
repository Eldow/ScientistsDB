// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var scientistSchema = new Schema({
  label: String,
  description: String,
  birthDate: { type: Date, default: Date.now },
  deathDate: { type: Date, default: Date.now },
  birthPlace_label: String,
  deathPlace_label: String,
  field_label: [String],
  doctoralAdvisor_label: [String],
  academicAdvisor_label: [String],
  knownFor_label: [String],
  doctoralStudent_label: [String],
  notableStudent_label: [String],
  spouse_label: [String],
  child_label: [String],
  influencedBy_label: [String],
  education_label: [String],
  occupation_label: [String],
  award_label: [String],
  citizenship_label: [String],
  almaMater_label: [String],
  nationality_label: [String],
  soundRecording_label: [String],
  institution_label: [String],
  residence_label: [String],
  deathCause_label: [String],
  restingPlace_label: [String],
  relation_label: [String],
  employer_label: [String],
  influenced_label: [String],
  parent_label: [String]
});

// the schema is useless so far
// we need to create a model using it
var Scientist = mongoose.model('Scientist', scientistSchema);

// make this available to our users in our Node applications
module.exports = Scientist;
