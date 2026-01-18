import { z } from 'zod';
import type { SkillsManager } from '../skills-manager.js';

export const ValidateSkillSchema = z.object({
  skillPath: z.string().describe('Path to SKILL.md file to validate')
});

export async function handleValidateSkill(
  manager: SkillsManager,
  args: z.infer<typeof ValidateSkillSchema>
) {
  const result = await manager.validateSkill(args.skillPath);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          path: args.skillPath,
          valid: result.valid,
          errors: result.errors,
          warnings: result.warnings,
          summary: result.valid
            ? 'Skill file is valid'
            : `Found ${result.errors.length} error(s) and ${result.warnings.length} warning(s)`
        }, null, 2)
      }
    ]
  };
}
