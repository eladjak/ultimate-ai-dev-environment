import { z } from 'zod';
import type { SkillsManager } from '../skills-manager.js';

export const GetSkillSchema = z.object({
  name: z.string().describe('Skill name to retrieve')
});

export async function handleGetSkill(
  manager: SkillsManager,
  args: z.infer<typeof GetSkillSchema>
) {
  const skill = manager.getSkill(args.name);

  if (!skill) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            error: `Skill '${args.name}' not found`,
            suggestion: 'Use list_skills or search_skills to find available skills'
          }, null, 2)
        }
      ]
    };
  }

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          name: skill.name,
          description: skill.description,
          triggers: skill.triggers,
          path: skill.path,
          lastModified: skill.lastModified,
          content: skill.content
        }, null, 2)
      }
    ]
  };
}
