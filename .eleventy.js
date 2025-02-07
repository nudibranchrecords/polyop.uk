import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addPassthroughCopy("./src/img");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
