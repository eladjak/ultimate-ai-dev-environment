import { z } from 'zod';
import type { SkillsManager } from '../skills-manager.js';

export const RefreshRegistrySchema = z.object({});

export async function handleRefreshRegistry(
  manager: SkillsManager,
  _args: z.infer<typeof RefreshRegistrySchema>
) {
  const result = await manager.refresh();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          skillsFound: result.skillsFound,
          updated: result.updated,
          message: `Successfully refreshed registry with ${result.skillsFound} skills`
        }, null, 2)
      }
    ]
  };
}
