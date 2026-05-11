---
name: commit-pr
description: Create branch (if needed), commit changes, push, and open a pull request
disable-model-invocation: true
---

Create a complete workflow: branch → commit → push → PR.

**Usage:**

- `/commit-pr` - Auto-generate branch name, commit message, and PR based on changes
- `/commit-pr <branch-name>` - Use specific branch name
- `/commit-pr <branch-name> | <commit message>` - Specify both branch and commit message

**Workflow:**

1. **Branch check:**
   - If on `main` or `master`: create a new feature branch
   - Use `$ARGUMENTS` if provided, otherwise generate descriptive name from changes
   - Branch naming: `feature/description` or `fix/description`
   - If already on a feature branch: continue on that branch

2. **Analyze changes:**
   - Run `git status` to see all untracked/modified files
   - Run `git diff` to see both staged and unstaged changes
   - Run `git log -5 --oneline` to match commit message style
   - Identify what changed and why (new feature, bug fix, refactor, etc.)

3. **Stage changes:**
   - Stage specific relevant files by name (prefer `git add <file>` over `git add -A`)
   - Never stage sensitive files (.env, credentials, etc.)
   - Ask user to confirm which files to stage if unclear

4. **Create commit:**
   - Check number of commits on current branch vs main/master:
     ```bash
     git rev-list --count main..HEAD
     ```
   - **If exactly 1 commit exists:** Use `git commit --amend` to squash changes into existing commit
     - Reuse existing commit message (or improve if needed)
     - This keeps PR history clean with single commit
   - **If 0 or 2+ commits:** Create new commit normally
   - Write concise commit message (1-2 sentences) focusing on WHY, not WHAT
   - Follow repository's commit message style from git log
   - Commit format (new commit):
     ```bash
     git commit -m "Commit message here"
     ```
   - Commit format (amend existing):
     ```bash
     git commit --amend -m "Updated commit message"
     ```

5. **Push to remote:**
   - Check if branch exists on remote:
     ```bash
     git ls-remote --heads origin <branch>
     ```
   - **If amended existing commit (used --amend):** Force push with lease:
     ```bash
     git push --force-with-lease origin <branch>
     ```
   - **If new branch or new commit:** Regular push with upstream:
     ```bash
     git push -u origin <branch>
     ```
   - Use `--force-with-lease` (safer than `--force`) to prevent overwriting others' changes

6. **Create pull request:**
   - Use `gh pr create` with title and body
   - PR title: short (under 70 characters)
   - PR body format:

     ```markdown
     ## Summary

     <1-3 bullet points>

     ## Test plan

     [Bulleted markdown checklist of TODOs for testing]
     ```

   - Use heredoc for PR body:

     ```bash
     gh pr create --title "PR title" --body "$(cat <<'EOF'
     ## Summary
     - Change 1
     - Change 2

     ## Test plan
     - [ ] Run npm run build
     - [ ] Run tests

     EOF
     )"
     ```

7. **Return PR URL** so user can view it

**Important notes:**

- NEVER use `--no-verify` or skip hooks unless user explicitly requests
- If pre-commit hook fails, fix the issue and create a NEW commit (don't use `--amend` after hook failure)
- `--amend` is ONLY used in step 4 when exactly 1 commit exists on the branch (normal workflow)
- Force push with `--force-with-lease` is allowed when amending (step 5), but never use bare `--force`
- If commit or push fails, investigate and fix the issue rather than bypassing
- Always ask for confirmation before staging unexpected files
