import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { DateTime } from "luxon";
import lightningCSS from "@11tyrocks/eleventy-plugin-lightningcss";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/CNAME");
  eleventyConfig.addPassthroughCopy("./src/run_grids");
  eleventyConfig.addPassthroughCopy("./src/ceremony");
  eleventyConfig.addPassthroughCopy("./src/media");
  eleventyConfig.addFilter("deduplicate", function (array) {
    return Array.from(new Set(array));
  });

  eleventyConfig.addFilter("date", (dateString, format = "LLLL y") =>
    DateTime.fromJSDate(dateString).toFormat(format)
  );

  eleventyConfig.addPlugin(lightningCSS);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
