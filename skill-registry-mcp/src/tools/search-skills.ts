import { z } from 'zod';
import type { SkillsManager } from '../skills-manager.js';

export const SearchSkillsSchema = z.object({
  query: z.string().describe('Search query (keywords, technology names, etc.)'),
  limit: z.number().optional().default(10).describe('Maximum number of results')
});

export async function handleSearchSkills(
  manager: SkillsManager,
  args: z.infer<typeof SearchSkillsSchema>
) {
  const results = manager.searchSkills(args.query, args.limit);

  const formatted = results.map(result => ({
    name: result.skill.name,
    description: result.skill.description,
    score: result.score,
    matchedFields: result.matchedFields,
    triggers: result.skill.triggers,
    path: result.skill.path
  }));

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          query: args.query,
          resultsCount: results.length,
          results: formatted
        }, null, 2)
      }
    ]
  };
}
