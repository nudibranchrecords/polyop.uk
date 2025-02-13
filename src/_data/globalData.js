import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default function () {
  const contactFilePath = path.join("src/contact.njk");
  const fileContent = fs.readFileSync(contactFilePath, "utf8");
  const { data } = matter(fileContent);

  return {
    // Contact data available in all templates
    contact: data,
  };
}
