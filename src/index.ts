import { mergeGQLSchemas } from "graphql-schema-utilities";
import { printSchemaWithDirectives } from "graphql-schema-utilities/dist/printers";
import { readFileSync, existsSync } from "fs";
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
  const globs = Object.keys(allDeps)
    .flatMap((k) => {
      const base = join(startPath, "node_modules", k, "schemas");
      if (!existsSync(base)) return [];
      let out: string[] = [join(base, "*.graphql")];
      const commonPath = join(base, "common");
      if (existsSync(commonPath)) out.push(join(commonPath, "*.graphql"));
      const namePath = join(base, name);
      if (existsSync(namePath)) out.push(join(namePath, "*.graphql"));
      return out;
    })
    .filter(Boolean);
  if (existsSync(join(startPath, "schemas")))
    globs.push(join(startPath, "schemas", "**", "*.graphql"));
  return mergeFromGlobs(globs);
}
/**
 * Merge schema files found in an array of glob strings into a single schema file
 * @param globs array of glob strings (ex: ./schemas/*.graphql)
 */
export async function mergeFromGlobs(globs: string[]) {
  const globString = "{" + globs.join(",") + "}";
  const out = await mergeGQLSchemas(globString);
  const schema = printSchemaWithDirectives(out);
  return schema;
}
