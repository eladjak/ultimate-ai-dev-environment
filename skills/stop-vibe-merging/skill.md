---
name: stop-vibe-merging
description: "AI code review checklist preventing 'vibe merging' - approving PRs without deep review. Use when doing 'code review', 'review PR', 'review pull request', 'check AI code', 'vibe merging', or before merging any AI-generated code."
---

# Stop Vibe Merging - AI Code Review Checklist

Prevent "vibe merging" - the dangerous practice of approving AI-generated PRs based on intuition rather than thorough review.

## What is Vibe Merging?

**Vibe Merging** = Approving pull requests based on:
- "It looks right"
- "The AI wrote it, it's probably fine"
- "CI is green, ship it"
- "I trust the author/AI"

**Source:** "Stop Vibe Merging" by shmulc
- Substack: https://shmulc.substack.com/p/stop-vibe-merging
- Medium: https://shmulc.medium.com/stop-vibe-merging-5a8ff5acff74

## Key Statistics

| Metric | Value | Implication |
|--------|-------|-------------|
| AI code logic errors | **1.7x more** than human code | Review MORE carefully, not less |
| Code review time increase | **91%** with AI-generated code | Expected - don't rush |
| CI green = correct? | **NO** | CI checks syntax, not logic |
| Most missed bugs | **Logic errors** | AI excels at syntax, fails at logic |

## The Core Principle

> "Speed in generation is meaningless without corresponding rigor in verification."

## Pre-Merge Checklist

### Level 1: Quick Scan (ALL PRs)
- [ ] **Read the actual code** - Don't just scan the diff
- [ ] **Understand the intent** - What problem does this solve?
- [ ] **Check edge cases** - What happens with null, empty, boundary values?
- [ ] **Verify error handling** - Are errors caught AND handled meaningfully?
- [ ] **Look for hardcoded values** - Magic numbers, strings, credentials?

### Level 2: Logic Review (AI-Generated Code)
- [ ] **Trace the data flow** - Follow data from input to output
- [ ] **Verify business logic** - Does it match requirements, not just compile?
- [ ] **Check for subtle bugs** - Off-by-one, race conditions, missing await
- [ ] **Review naming** - Are names accurate? AI often picks plausible but wrong names
- [ ] **Test negative paths** - What happens when things fail?
- [ ] **Verify imports** - Are all imports used? Are there phantom imports?

### Level 3: Deep Review (Critical Paths)
- [ ] **Security review** - SQL injection, XSS, auth bypass, data leaks
- [ ] **Performance check** - N+1 queries, unnecessary loops, memory leaks
- [ ] **Concurrency** - Race conditions, deadlocks, atomic operations
- [ ] **State management** - Mutations, stale state, inconsistent state
- [ ] **API contracts** - Breaking changes, versioning, backward compatibility

## Red Flags in AI-Generated Code

Watch for these common AI mistakes:

| Red Flag | Example | Why It's Wrong |
|----------|---------|----------------|
| **Plausible but wrong logic** | Sorting by wrong field | Compiles fine, logic is wrong |
| **Over-engineering** | 5 layers of abstraction for CRUD | AI loves patterns, even when unnecessary |
| **Phantom dependencies** | Importing non-existent modules | AI hallucinates package names |
| **Incomplete error handling** | `catch (e) { console.log(e) }` | Looks handled, actually swallowed |
| **Wrong defaults** | `timeout: 0` instead of `timeout: 30000` | Subtle but critical |
| **Copy-paste drift** | Similar functions with subtle differences | AI duplicates with small errors |
| **Missing null checks** | `user.name.toLowerCase()` | Works in tests, crashes in prod |
| **Outdated API usage** | Using deprecated methods | AI trained on old code |

## AI Code Review Tools (Benchmarked)

| Tool | Precision | Recall | F1 Score | Best For |
|------|-----------|--------|----------|----------|
| **Baz** | 70.9% | - | 52.5% | General use |
| **CodeRabbit** | - | 53.5% | - | Catching ALL bugs |
| **Cursor** | 68.1% | - | 36.6% | Senior teams |
| **Augment** | - | - | 53.8% | Controlled environments |
| **Graphite** | 75.0% | 8.8% | - | High precision (few false positives) |

**Interpretation:**
- **High Precision** (Graphite, Baz) = Few false positives, but misses bugs
- **High Recall** (CodeRabbit) = Catches more bugs, but more noise
- **Best F1** (Augment, Baz) = Balanced approach

## Metrics to Track

Monitor these to detect vibe merging in your team:

| Metric | Healthy | Vibe Merging |
|--------|---------|--------------|
| **Time to merge** | Increasing with AI PRs | Decreasing (rubber-stamping) |
| **Comments per PR** | 3-5+ substantive | 0-1 ("LGTM") |
| **Review depth** | Multi-line discussions | Quick approvals |
| **Post-merge bugs** | Stable/decreasing | Increasing |
| **Revert rate** | Low | High |

## Integration with Claude Code

When reviewing code in Claude Code sessions:

```markdown
## Before merging ANY PR:

1. Run the stop-vibe-merging checklist (this skill)
2. Use the code-reviewer agent for automated review
3. Use the security-reviewer agent for security-critical code
4. Verify with `bunx tsc --noEmit && bunx ultracite check`
5. Run tests: `bun test`
6. Check coverage: aim for 80%+
```

## Quick Decision Tree

```
Is this AI-generated code?
  YES → Apply Level 2 checklist (minimum)
    Is it security/auth/payment related?
      YES → Apply Level 3 checklist + security-reviewer agent
      NO  → Level 2 is sufficient
  NO → Apply Level 1 checklist (minimum)
    Is the author junior or new to project?
      YES → Apply Level 2 checklist
      NO  → Level 1 may be sufficient
```

## Treat AI Code Like Junior Dev Code

The most important mindset shift:

1. **Don't trust AI output by default** - Verify everything
2. **CI green != correct** - CI checks syntax and types, not business logic
3. **AI excels at syntax, fails at logic** - Focus your review on logic
4. **Speed is not the goal** - Correctness is the goal
5. **When in doubt, test manually** - Run the code, check the output
