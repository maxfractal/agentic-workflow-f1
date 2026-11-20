// PostToolUse hook: run Prettier on the file Claude just edited.
// Reads the hook payload from stdin and uses tool_input.file_path. It never blocks: it always exits 0.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, relative, isAbsolute } from 'node:path'

let raw = ''
for await (const chunk of process.stdin) raw += chunk

let file
try {
  file = JSON.parse(raw)?.tool_input?.file_path
} catch {
  process.exit(0)
}
if (typeof file !== 'string' || !existsSync(file)) process.exit(0)

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd()
const rel = relative(root, file)
// Only files inside the project, and never dependencies.
if (rel.startsWith('..') || isAbsolute(rel) || rel.split(/[\\/]/).includes('node_modules')) process.exit(0)

const prettier = join(root, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
if (!existsSync(prettier)) process.exit(0)

// --ignore-unknown skips files Prettier can't parse; .prettierignore is honoured.
const r = spawnSync(process.execPath, [prettier, '--write', '--ignore-unknown', '--log-level', 'warn', file], {
  cwd: root,
  encoding: 'utf8',
})
if (r.status !== 0) process.stderr.write(`prettier failed on ${rel}:\n${r.stderr || r.stdout}`)
process.exit(0)
