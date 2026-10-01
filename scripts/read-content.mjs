import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';

const dataRoot = fileURLToPath(new URL('../src/data/', import.meta.url));
const cache = new Map();
// Execute the actual typed data modules; do not maintain a second fixture registry.
export function readContent(name) {
  const filename = path.resolve(dataRoot, `${name}.ts`);
  if (cache.has(filename)) return cache.get(filename);
  const dataModule = { exports: {} };
  cache.set(filename, dataModule.exports);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  vm.runInNewContext(outputText, {
    module: dataModule, exports: dataModule.exports,
    require: (specifier) => readContent(specifier.replace(/^\.\//, '')),
  }, { filename });
  return dataModule.exports;
}
