import { z } from 'zod';
import type { SkillsManager } from '../skills-manager.js';

export const ListSkillsSchema = z.object({
  category: z.string().optional().describe('Filter by category (not yet implemented)'),
  pattern: z.string().optional().describe('Filter by name or description pattern')
});

export async function handleListSkills(
  manager: SkillsManager,
  args: z.infer<typeof ListSkillsSchema>
) {
  const skills = manager.listSkills(args);

  const summary = skills.map(skill => ({
    name: skill.name,
    description: skill.description,
    triggers: skill.triggers,
    path: skill.path
  }));

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          total: skills.length,
          skills: summary
        }, null, 2)
      }
    ]
  };
}
