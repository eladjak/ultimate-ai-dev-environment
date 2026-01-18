import { z } from 'zod';
import type { SkillsManager } from '../skills-manager.js';

export const RecommendSkillSchema = z.object({
  userRequest: z.string().describe('User request or description of what they want to do'),
  context: z.string().optional().describe('Additional context (optional)'),
  limit: z.number().optional().default(5).describe('Maximum number of recommendations')
});

export async function handleRecommendSkill(
  manager: SkillsManager,
  args: z.infer<typeof RecommendSkillSchema>
) {
  const fullRequest = args.context
    ? `${args.userRequest} ${args.context}`
    : args.userRequest;

  const recommendations = manager.recommendSkills(fullRequest, args.limit);

  if (recommendations.length === 0) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            userRequest: args.userRequest,
            recommendations: [],
            message: 'No matching skills found for this request'
          }, null, 2)
        }
      ]
    };
  }

  const formatted = recommendations.map(rec => ({
    name: rec.skill.name,
    description: rec.skill.description,
    confidence: Math.round(rec.confidence * 100),
    reason: rec.reason,
    triggers: rec.skill.triggers,
    path: rec.skill.path
  }));

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({
          userRequest: args.userRequest,
          recommendationsCount: recommendations.length,
          recommendations: formatted
        }, null, 2)
      }
    ]
  };
}
