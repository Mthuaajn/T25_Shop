class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // BUILD QUERY
    // 1A) filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 1B) advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, (match) => `$${match}`);
    // Handle regex with case-insensitive option
    if (queryObj.title && queryObj.title.regex) {
      queryStr = queryStr.replace(`"${queryObj.title.regex}"`, (match) => {
        
        return `/${JSON.parse(match)}/i`;
      });
    }
    this.query.find(eval(`(${queryStr})`));
    return this;
  }
  sort() {
    // SORTING
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createAt");
    }
    return this;
  }
  fields() {
    // field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v -id");
    }
    return this;
  }
  async pagination(Model) {
    // 4) pagination
    const queryS = this.query;
    const NumberData = await Model.find(queryS).countDocuments();
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    // Calculate total number of pages
    let totalPages = 0;
    if (this.queryString.page) {
      totalPages = Math.ceil(NumberData / limit);
    } else {
      totalPages = 1;
    }

    // Add total pages to the response
    this.query.totalPages = totalPages;
    return this;
  }
}

module.exports = APIFeatures;
