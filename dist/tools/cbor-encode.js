// Build script to convert individual JSON files from an input directory
// to CBOR (.bin) files in an output directory
import fs from 'fs';
import path from 'path';
import { encode } from 'cbor2'; // Import the CBOR library
export async function main(argv) {
    const args = argv; // caller will pass process.argv.slice(2)
    if (!args || args.length < 2) {
        console.error('Usage: cbor-encode <input-folder> <output-folder>');
        return 1;
    }
    const [inputFolder, outputFolder] = args;
    console.log(`Encoding CBOR from "${inputFolder}" into "${outputFolder}"`);
    // Get the target input and output directories from command line arguments
    const inputDirRelative = inputFolder; //process.argv[2];
    const outputDirRelative = outputFolder; //process.argv[3];
    if (!inputDirRelative || !outputDirRelative) {
        console.error('Error: Please provide both an input and an output directory path as arguments.');
        console.error('Usage: node scripts/cbor-encode.js <inputDir> <outputDir>');
        process.exit(1);
    }
    // Resolve relative paths based on the project root (assuming script is run from project root)
    // If running from scripts/ dir, adjust the base path accordingly.
    // Let's assume it's run from the project root for simplicity in package.json scripts.
    const projectRoot = process.cwd();
    const inputDir = path.resolve(projectRoot, inputDirRelative);
    const outputDir = path.resolve(projectRoot, outputDirRelative);
    if (!fs.existsSync(inputDir) || !fs.lstatSync(inputDir).isDirectory()) {
        console.error(`Error: Input directory not found or is not a directory: ${inputDir}`);
        process.exit(1);
    }
    // Ensure output directory exists, create if it doesn't
    if (!fs.existsSync(outputDir)) {
        console.log(`Output directory not found. Creating: ${outputDir}`);
        try {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        catch (error) {
            console.error(`Error creating output directory ${outputDir}:`, error);
            process.exit(1);
        }
    }
    else if (!fs.lstatSync(outputDir).isDirectory()) {
        console.error(`Error: Output path exists but is not a directory: ${outputDir}`);
        process.exit(1);
    }
    console.log(`Input directory: ${inputDir}`);
    console.log(`Output directory: ${outputDir}`);
    console.log('Processing JSON files...');
    // Read all files in the input directory
    const files = fs.readdirSync(inputDir);
    files.forEach((file) => {
        if (path.extname(file).toLowerCase() === '.json') {
            const jsonFilePath = path.join(inputDir, file);
            const binFileName = path.basename(file, '.json') + '.bin';
            const binFilePath = path.join(outputDir, binFileName);
            try {
                // Read and parse the JSON file
                const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
                // Convert to CBOR
                const encoded = encode(jsonData, { rejectDuplicateKeys: true });
                // Write CBOR data to the .bin file in the output directory
                fs.writeFileSync(binFilePath, encoded);
                console.log(`Successfully converted ${jsonFilePath} to ${binFilePath}`);
            }
            catch (error) {
                console.error(`Error processing file ${jsonFilePath}:`, error);
            }
        }
    });
    console.log('CBOR encoding process finished.');
    return 0;
}
