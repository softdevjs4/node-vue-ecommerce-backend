const noDataFound = (res) => {
  return res.status(404).json({ success: false, error: 'No data found!' });
}

const somethingError = (res, err) => {
  res.status(400).json({ "error": "Something error!" });
  console.log(err);
}

exports.noDataFound = noDataFound;
exports.somethingError = somethingError;