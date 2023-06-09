// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const AuthorSchema = new Schema({
//   first_name: { type: String, required: true, maxLength: 100 },
//   family_name: { type: String, required: true, maxLength: 100 },
//   date_of_birth: {type: Date},
//   date_of_death: {type: Date},
// });

// AuthorSchema.virtual("name").get( () => {
//   let fullname="";
//   if(first_name && family_name){
//     fullname = `${family_name}, ${first_name}`;
//   }
//   return fullname;
// });

// AuthorSchema.virtual('url').get(function() {
//   return `/catalog/author/${this._id}`;
// });

// module.exports = mongoose.model("Author", AuthorSchema);

const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("birth").get(function(){
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
})

AuthorSchema.virtual("death").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

AuthorSchema.virtual("lifespan").get(function () {
  let str = '';
  if(this.date_of_death && this.date_of_birth){
    str = `(${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)})`;
  } else if(this.date_of_birth && !this.date_of_death){
    str = `(${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)})`;
  }
  return str;
})

AuthorSchema.virtual("birth_calendar").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toFormat("yyyy-MM-dd");
});

AuthorSchema.virtual("death_calendar").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toFormat("yyyy-MM-dd");
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
