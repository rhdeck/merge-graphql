#!/usr/bin/env node
import { writeFileSync } from "fs";
import { join } from "path";
import commander from "commander";
import { mergeDependencies } from "./";
commander.option(
  "-o --output",
  "File to emit results to",
  join(process.cwd(), "./schema.graphql")
);
commander.option("-p --path", "Path to workspace", process.cwd());
commander.parse(process.argv);
(async () => {
  const schema = await mergeDependencies(commander.path);
  writeFileSync(commander.output, schema);
})();
