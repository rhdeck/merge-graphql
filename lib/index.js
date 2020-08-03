"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDependencies = void 0;
const graphql_schema_utilities_1 = require("graphql-schema-utilities");
const printers_1 = require("graphql-schema-utilities/dist/printers");
const fs_1 = require("fs");
const path_1 = require("path");
async function mergeDependencies(startPath = process.cwd()) {
    const { dependencies, devDependencies, name } = JSON.parse(fs_1.readFileSync(path_1.join(startPath, "package.json"), { encoding: "utf-8" }));
    const allDeps = { ...(dependencies || {}), ...(devDependencies || {}) };
    const globs = "{" +
        Object.keys(allDeps)
            .flatMap((k) => [
            path_1.join("startPath", "node_modules", k, "schemas", "common", "*.graphql"),
            path_1.join("startPath", "node_modules", k, "schemas", name, "*.graphql"),
        ])
            .join(",") +
        "}";
    const out = await graphql_schema_utilities_1.mergeGQLSchemas(globs);
    const schema = printers_1.printSchemaWithDirectives(out);
    return schema;
}
exports.mergeDependencies = mergeDependencies;
//# sourceMappingURL=index.js.map