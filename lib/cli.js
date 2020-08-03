#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const commander_1 = __importDefault(require("commander"));
const _1 = require("./");
commander_1.default.option("-o --output", "File to emit results to", path_1.join(process.cwd(), "./schema.graphql"));
commander_1.default.option("-p --path", "Path to workspace", process.cwd());
commander_1.default.parse(process.argv);
(async () => {
    const schema = await _1.mergeDependencies(commander_1.default.path);
    fs_1.writeFileSync(commander_1.default.output, schema);
})();
//# sourceMappingURL=cli.js.map