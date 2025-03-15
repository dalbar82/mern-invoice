import asyncHandler from 'express-async-handler'
import Document from '../../models/documentModel.js'

// $-title   Get all documents belonging to a specific User
// $-path    GET /api/v1/document/all
// $-auth    Private


const getAllUserDocuments = asyncHandler(async (req, res) => {
  const limit = 10;
  const lastCreatedAt = req.query.lastCreatedAt;

  let query = { organisation: req.user.organisation };

  if (lastCreatedAt) {
    query.createdAt = { $lte: new Date(lastCreatedAt) };
  }

  console.log("Fetching documents before:", lastCreatedAt);

  const documents = await Document.find(query)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .lean();

  console.log("Documents fetched:", documents.length);

  // Fix: Ensure `lastCreatedAt` is always a valid date string or null
  const lastCreatedAtValue =
    documents.length && documents[documents.length - 1].createdAt
      ? new Date(documents[documents.length - 1].createdAt).toISOString()
      : null;

  console.log("Last createdAt sent:", lastCreatedAtValue);

  res.json({
    success: true,
    myDocuments: documents,
    lastCreatedAt: lastCreatedAtValue,
    hasMore: documents.length === limit,
  });
});




//pagination

// const getAllUserDocuments = asyncHandler(async (req, res) => {
// 	const pageSize = 10
// 	const page = Number(req.query.page) || 1

// 	const count = await Document.countDocuments({ organisation: req.user.organisation})

// 	const documents = await Document.find({ organisation: req.user.organisation })
// 		.sort({
// 			createdAt: -1,
// 		})
// 		// .limit(pageSize)
// 		.skip(pageSize * (page - 1))
// 		.lean()

// 	res.json({
// 		success: true,
// 		totalDocuments: count,
// 		numberOfPages: Math.ceil(count / pageSize),
// 		myDocuments: documents,
// 	})
// })

export default getAllUserDocuments
