---
name: build-feature
description: Build one small feature in this F1 workshop repo (code, unit test, story, e2e for pages), then check it with verify or gate. Use when asked to implement a single page, component or lib change, or when a script-owned loop (build:loop, dispatch) hands you a task.
---

# Build one feature

You build **one** small feature. Not a refactor, not extra features, not fixes to unrelated code.

## 1. Read

- The task. If it gives an item id or a plan, read that; do not invent scope beyond it.
- `CLAUDE.md`: the deterministic/delegated rule, project map and conventions apply to everything below.
- Never read anything in `workshop/`.
- Read the nearest existing example before writing: for a page, `src/pages/CalendarPage.tsx` with its
  `.test.tsx` and `.stories.tsx`, and `e2e/site.spec.ts`; for a lib function, `src/lib/standings.ts` and its test.
  Test helpers live in `src/test/` (`renderAt(path)`, `withRouter`).

## 2. Write

Every feature ships with:

| What you add | Also add |
|---|---|
| Component in `src/components/` | `X.test.tsx` (Testing Library) + `X.stories.tsx` |
| Page in `src/pages/` | `XPage.test.tsx` + `XPage.stories.tsx` + e2e test in `e2e/`, route in `src/App.tsx`, link in `navItems` in `src/components/Layout.tsx` |
| Pure function in `src/lib/` | `x.test.ts` |

Rules: strict TypeScript, no `any`. Data comes from `src/data/season.ts` (no network). Team colours are
hex values; no official F1 or team logos. Keep the diff to what the task needs.

## 3. Check and fix

Pick the mode from the prompt.

### Standalone (no script-owned loop mentioned)

1. Run `npm run format`, then `npm run -s verify -- --json`.
2. Read the failures (`{check,id,status,message}[]`). Fix the ones your change caused, and run verify again.
3. **Ignore** `src/lib/dates.test.ts` "keeps the circuit calendar date for a viewer in Los Angeles". It fails
   on `main` on purpose. Do not fix it unless asked.
4. If a failure is not yours and is not the Los Angeles test, report it; do not fix it.

### Inside a script-owned loop (the prompt says so)

The script owns the loop, the attempt counter and the gate. So:

- **Do not retry and do not count attempts.** Make your best change once.
- Run `npm run format`, then `npm run -s gate -- --json`.
- Fix **only the new failures** gate reports. Pre-existing ones (including the Los Angeles date test) are not yours.
  You may re-run gate after a fix to confirm it, but do not loop on it; the script will call you again if needed.
- No git, no network, no tracker, board or merge scripts. Never set a human gate.
- If a decision belongs to a human (unclear scope, a product or design choice, a conflict with the plan),
  **do not ask in chat**. Return `needs_human` with exactly one question.
- Answer with the JSON verdict the script asks for:
  - `ok`: gate reports 0 new failures.
  - `failed`: new failures remain; the summary names them.
  - `needs_human`: plus `question` (one question).
  `summary` is one line: what you changed and why.

## 4. Report

- Never say "verified", "done" or "passing" unless you ran the check in this session. Quote the last line
  of the command you ran (`verify` standalone, `gate` in a loop), plus any remaining failures by `id`.
- List the files you added or changed.
- Say what you left alone and why (for example, the pre-existing Los Angeles date failure).
