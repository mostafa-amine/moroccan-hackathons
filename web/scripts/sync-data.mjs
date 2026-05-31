// Copies the single source of truth (repo /data/hackathons.json) into the web app
// so it can be imported at build time. Runs before dev/build/generate and on install.
// The data/ file is the ONLY place events are edited; this copy is regenerated.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url)) // web/scripts
const src = resolve(here, '../../data/hackathons.json') // repo/data/hackathons.json
const dest = resolve(here, '../app/data/hackathons.json') // web/app/data/hackathons.json

const raw = await readFile(src, 'utf8')
JSON.parse(raw) // fail loudly if the source is malformed
await mkdir(dirname(dest), { recursive: true })
await writeFile(dest, raw)
console.log(`[sync-data] ${src}\n        -> ${dest}`)
