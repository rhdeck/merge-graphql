import { mergeGQLSchemas } from "graphql-schema-utilities";
import { printSchemaWithDirectives } from "graphql-schema-utilities/dist/printers";
import { readFileSync } from "fs";
import { join } from "path";
/**
 * Extract and merge graphql schemas from dependencies into a single string.
 *
 * Gets all from schemas/common and then just the ones for your project (identified in schemas/{name})
 * @param startPath Path to start looking at package.json and associated node_modules
 */
export async function mergeDependencies(startPath = process.cwd()) {
  const { dependencies, devDependencies, name } = JSON.parse(
    readFileSync(join(startPath, "package.json"), { encoding: "utf-8" })
  );
  const allDeps = { ...(dependencies || {}), ...(devDependencies || {}) };
  const globs =
    "{" +
    Object.keys(allDeps)
      .flatMap((k) => [
        join(startPath, "node_modules", k, "schemas", "common", "*.graphql"),
        join(startPath, "node_modules", k, "schemas", name, "*.graphql"),
      ])
      .join(",") +
    "}";
  const out = await mergeGQLSchemas(globs);
  const schema = printSchemaWithDirectives(out);
  return schema;
}
