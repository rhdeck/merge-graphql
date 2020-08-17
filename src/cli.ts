#!/usr/bin/env node
import { writeFileSync } from "fs";
import { join } from "path";
import commander from "commander";
import { mergeDependencies } from "./";
commander.option(
  "-o --output <path-to-schema.graphql>",
  "File to emit results to",
  join(process.cwd(), "./schema.graphql")
);
commander.option(
  "-p --path <path-to-workspace>",
  "Path to workspace",
  process.cwd()
);
commander.parse(process.argv);
if (!commander.isDocumenting)
  (async () => {
    const schema = await mergeDependencies(commander.path);
    writeFileSync(commander.output, schema);
  })();
export { commander };
