const csv = require("csv-parser");
const stream = require("stream");

const channles = ["instagram", "facebook", "whatsapp", "email"];

exports.validate_file = async (buffer) => {
  const results = [];

  const data = buffer.toString("utf-8");
  const lines = data.split("\n");

  if (lines.length < 1000)
    throw new Error("CSV must have at least 1000 records");

  const readable_stream = new stream.Readable();
  readable_stream.push(buffer);
  readable_stream.push(null);

  return new Promise((resolve, reject) => {
    readable_stream
      .pipe(csv())
      .on("data", (row) => {
        if (!channles.includes(row.channel)) {
          return reject(new Error(`Invalid channel: ${row.channel}`));
        }
        results.push(row);
      })
      .on("end", () => {
        resolve(true);
      })
      .on("error", (err) => {
        return reject(new Error(`Error parsing CSV: ${err.message}`));
      });
  });
};
