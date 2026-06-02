---
name: design-system-ba-ptbd-redesign
description: Creates implementation-ready design-system guidance derived from local Figma styles in "BA-PTBD-REDESIGN".
---

<!-- TYPEUI_SH_MANAGED_START -->

# BA-PTBD-REDESIGN

## Mission
Document and operationalize the BA-PTBD-REDESIGN style foundations extracted from Figma so teams can build consistent interfaces quickly.

## Brand
- Product/brand: BA-PTBD-REDESIGN
- Audience: Designers and engineers building this product
- Product surface: web app

## Style Foundations
- Visual style: clean, token-driven, functional, radius Spacing/Radius-s/Spacing/radius-m/Spacing/radius-L/Spacing/radius-XL
- Typography scale: label, caption, Titles/H1, Titles/H2, Titles/H3, Titles/H4, Titles/H5, Body/body-L-reg, Body/body-L-med, Body/body-M-reg, Body/body-M-med, Body/body-M-bold, Body/body-S-reg, Body/body-S-med
- Color palette: white, red-dark-primary, red-soft, red-bg, cta, cta-hover, blue-bg-light, blue-ultra-light, black, grey-text, grey-border, grey-bg, green, green-light
- Spacing scale: Spacing/badge-padding, Spacing/button-padding-height, Spacing/button-padding-width, Spacing/input-padding, Spacing/card-padding-s, Spacing/card-padding-m, Spacing/card-padding-L, Spacing/section-padding-height, Spacing/section-padding-width, Spacing/page-top-padding
- Radius/shadow/motion tokens: duration-fast 120ms, duration-base 200ms, ease-standard

## Component Families
- icon
- CTA
- text-swatch
- color-swatch
- Star 1
- checkbox
- status
- msg
- bullets
- breadcrumbs
- radio-btn
- Input
- variant
- label

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required
- Focus-visible rules required
- Contrast constraints required

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use extracted color tokens before introducing one-off values: white
- red-dark-primary
- red-soft
- red-bg
- cta
- cta-hover.
- Use these typography styles consistently: label
- caption
- Titles/H1
- Titles/H2
- Titles/H3
- Titles/H4.
- Define all interaction states for interactive components: default
- hover
- focus-visible
- active
- disabled
- and loading.

## Rules: Don't
- Do not duplicate existing style tokens with one-off naming.
- Do not remove focus-visible indicators or keyboard support.
- Do not hard-code raw values where local styles or variables already exist.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy
4. variants
5. and interactions.
6. Add accessibility acceptance criteria.
7. Add anti-patterns and migration notes.
8. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule uses "must".
- Every recommendation uses "should".
- Every accessibility rule is testable in implementation.
- Prefer system consistency over local visual exceptions.

## Acceptance Checklist
- Frontmatter exists with valid `name` and `description`.
- Guidance is under 500 lines for `skill.md` when possible.
- Accessibility and interaction states are explicitly documented.
- Rules are concrete, testable, and non-ambiguous.
- Output can be reused in other repositories with only variable replacement.

## TypeUI + Agentic Integration
This `SKILL.md` is intended for `typeui.sh` CLI workflows.
It can later be integrated with agentic tools including Claude Code, OpenCode, Gemini CLI, Cursor, and similar assistants.

<!-- TYPEUI_SH_MANAGED_END -->
