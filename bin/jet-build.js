#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

function buildEndpointImportPaths(targetPath, endpointImports = []) {
  const stats = fs.statSync(targetPath);
  let imports = [...endpointImports];

  if (stats.isDirectory()) {
    const dirListing = fs.readdirSync(targetPath);

    for (const listing of dirListing) {
      const fullPath = path.join(targetPath, listing);
      const newImports = buildEndpointImportPaths(fullPath, imports);
      imports = newImports;
    }
  } else if (stats.isFile()) {
    const file = fs.readFileSync(targetPath);
    const content = file.toString();

    if (content.includes('@route')) {
      imports.push(targetPath);
    }
  }

  return imports;
}

function main() {
  const srcDirArg = process.argv[2];

  if (!srcDirArg) {
    console.error('Source directory not provided, no output was generated');
    process.exit(1);
  }

  const srcDirPath = path.join(process.cwd(), srcDirArg);

  if (!fs.existsSync(srcDirPath)) {
    console.error(`Could not locate src directory at provided path: ${srcDir}`);
    process.exit(1);
  }

  const abosluteImportPaths = buildEndpointImportPaths(srcDirPath);
  const relativeImportPaths = abosluteImportPaths.map(p => path.relative(srcDirPath, p));

  const codeComment = '/** GENERATED FILE DO NOT MODIFY */\n\n';

  const generatedFileContents = relativeImportPaths.reduce(
    (content, importPath) => `${content}import \'./${importPath.replace('.ts', '')}\';\n`,
    codeComment,
  );

  // generate output file
  const outputFileName = 'endpoints.ts';
  const outputPath = path.join(srcDirPath, outputFileName);

  fs.writeFileSync(outputPath,generatedFileContents);

  console.log(`File generated at ${outputPath}`);
}

if (require.main === module) {
  main();
}