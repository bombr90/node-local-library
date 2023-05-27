// const Author = require("../models/author");
// const asyncHandler = require("express-async-handler");

// // Display list of all Authors.
// exports.author_list = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Author list");
// });

// // Display detail page for a specific Author.
// exports.author_detail = asyncHandler(async (req, res, next) => {
//   res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
// });

// // Display Author create form on GET.
// exports.author_create_get = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Author create GET");
// });

// // Handle Author create on POST.
// exports.author_create_post = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Author create POST");
// });

// // Display Author delete form on GET.
// exports.author_delete_get = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Author delete GET");
// });

// // Handle Author delete on POST.
// exports.author_delete_post = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Author delete POST");
// });

// // Display Author update form on GET.
// exports.author_update_get = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Author update GET");
// });

// // Handle Author update on POST.
// exports.author_update_post = asyncHandler(async (req, res, next) => {
  // res.send("NOT IMPLEMENTED: Author update POST");
// });

const Author = require('../models/author')
const asyncHandler = require('express-async-handler')
const Book = require("../models/book");


const author_list = asyncHandler(async(req,res,next) => {
   const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
   res.render("author_list", {
     title: "Author List",
     author_list: allAuthors,
   });
})

const author_detail = asyncHandler(async(req,res,next) => {
   const [author, allBooksByAuthor] = await Promise.all([
     Author.findById(req.params.id).exec(),
     Book.find({ author: req.params.id }, "title summary").exec(),
   ]);

   if (author === null) {
     // No results.
     const err = new Error("Author not found");
     err.status = 404;
     return next(err);
   }

   res.render("author_detail", {
     title: "Author Detail",
     author: author,
     author_books: allBooksByAuthor,
   });
});

const author_create_get = asyncHandler(async(req,res,next)=> {
  res.send('Not implemented: Author created GET');
});

const author_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Author created POST");
});

const author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Author delete GET");
});

const author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Author delete POST");
});

const author_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Author update GET");
});

const author_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented: Author update POST");
});

module.exports = {
  author_detail,
  author_list,
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post
}
