const User = require("../module/user.model");

const fetchDetails = async (req, res) => {
  let { pageIndex, pageSize, search, sort } = req.query;
  let query = {};
  pageSize = parseInt(pageSize);
  pageIndex = parseInt(pageIndex);
  
  // Default pagination values
  if (!pageIndex) pageIndex = 1;
  if (!pageSize) pageSize = 10;

  // Build search query if search term is provided
  if (search && search !== "") {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } }
      ],
    };
  }

  const skip = (pageIndex - 1) * pageSize;
  const aggregationPipeline = [];
  aggregationPipeline.push({ $match: query });

  // Set default sort criteria
  let sortCriteria = { age: -1 }; // Default to descending sort on age

  // Check for sort criteria in the request
  if (sort && sort.key && (sort.order === "asc" || sort.order === "desc")) {
    let { key, order } = sort;
    sortCriteria = { [key]: order === "asc" ? 1 : -1 };
  }

  // Add sorting to the aggregation pipeline
  aggregationPipeline.push({ $sort: sortCriteria });
  aggregationPipeline.push({ $skip: skip });
  aggregationPipeline.push({ $limit: pageSize });

  try {
    const totalCount = await User.countDocuments(query);
    let users = await User.aggregate(aggregationPipeline);
    console.log(users, 38);
    res.send({
      success: true,
      data: {
        data: users,
        tableData: {
          search: search || "",
          pageIndex: pageIndex,
          pageSize: pageSize,
          sort: {
            key: sort ? sort.key : "age", 
            order: sort ? sort.order : "desc", 
          },
          totalRecords: totalCount,
        },
      },
      message: "Users List fetched successfully!",
    });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

module.exports = fetchDetails;
