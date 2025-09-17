import * as esbuild from 'esbuild'

console.log('Building plugins...');
async function build() {
    const ctx = await esbuild.context({
        entryPoints: ['./plugins/*.mts'],
        bundle: true,
        platform: 'node',
        target: 'es2024',
        format: 'esm',
        packages: 'external',
        outdir: './plugins',
        outExtension: { '.js': '.mjs' },
    })
    const watchArg = process.argv[2];
    if (watchArg === '--watch') {
        await ctx.watch();
        console.log('Watching for changes...');
    } else {
        await ctx.rebuild();
        process.exit(0);
    }
}

build();