// TODO: Customize Eleventy configuration as needed for your site
import CleanCSS from "clean-css";
import { minify } from "terser";

export default function (eleventyConfig) {
  // Copy static assets.
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // TODO: Configure additional file extensions if needed
  eleventyConfig.addTemplateFormats(["md", "css"]);

  // Add collections.
  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md");
  });

  // CSS minification filter
  // https://www.11ty.dev/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // JavaScript minification filter
  // https://www.11ty.dev/docs/quicktips/inline-js/
  eleventyConfig.addAsyncFilter("jsmin", async function (code) {
    try {
      const minified = await minify(code);
      return minified.code;
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      return code;
    }
  });

  // Image optimization shortcode
  // Usage: {% image "src/assets/images/photo.jpg", "Alt text", "300w" %}
  eleventyConfig.addShortcode(
    "image",
    async function (src, alt, sizes = "100vw") {
      const Image = await import("@11ty/eleventy-img");

      if (alt === undefined) {
        throw new Error(`Missing \`alt\` on image from: ${src}`);
      }

      let metadata = await Image.default(src, {
        widths: [300, 600, 900, 1200],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/assets/images/",
        urlPath: "/assets/images/",
      });

      let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };

      return Image.default.generateHTML(metadata, imageAttributes);
    },
  );

  // RSS feed filters
  eleventyConfig.addFilter("dateToRfc822", function (date) {
    return new Date(date).toUTCString();
  });

  eleventyConfig.addFilter(
    "getNewestCollectionItemDate",
    function (collection) {
      if (!collection || !collection.length) {
        return new Date();
      }
      return new Date(Math.max(...collection.map((item) => item.date)));
    },
  );

  eleventyConfig.addFilter("limit", function (array, limit) {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter("truncate", function (str, length = 200) {
    if (!str) return "";
    return str.length > length ? str.substring(0, length) + "..." : str;
  });

  // TODO: Add more custom filters, shortcodes, or collections here.

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // TODO: Add other configuration options as needed.
  };
}
