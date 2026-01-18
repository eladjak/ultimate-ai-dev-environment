import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { SkillsManager } from './skills-manager.js';

/**
 * Register MCP resources for skill access
 */
export function registerResources(server: McpServer, manager: SkillsManager) {
  // Resource: skill://{name} - Get full skill content
  server.resource(
    'skill',
    new ResourceTemplate('skill://{name}', { list: undefined }),
    async (uri, variables) => {
      const skillName = variables.name as string;
      const skill = manager.getSkill(skillName);

      if (!skill) {
        throw new Error(`Skill '${skillName}' not found`);
      }

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify({
              name: skill.name,
              description: skill.description,
              triggers: skill.triggers,
              content: skill.content,
              path: skill.path,
              lastModified: skill.lastModified
            }, null, 2)
          }
        ]
      };
    }
  );

  // Resource: skill://metadata/{name} - Get skill metadata only
  server.resource(
    'skill-metadata',
    new ResourceTemplate('skill://metadata/{name}', { list: undefined }),
    async (uri, variables) => {
      const skillName = variables.name as string;
      const skill = manager.getSkill(skillName);

      if (!skill) {
        throw new Error(`Skill '${skillName}' not found`);
      }

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify({
              name: skill.name,
              description: skill.description,
              triggers: skill.triggers,
              path: skill.path,
              lastModified: skill.lastModified
            }, null, 2)
          }
        ]
      };
    }
  );

  // Resource: skill://search/{query} - Search results as resource
  server.resource(
    'skill-search',
    new ResourceTemplate('skill://search/{query}', { list: undefined }),
    async (uri, variables) => {
      const query = decodeURIComponent(variables.query as string);
      const results = manager.searchSkills(query, 10);

      const formatted = results.map(result => ({
        name: result.skill.name,
        description: result.skill.description,
        score: result.score,
        matchedFields: result.matchedFields,
        triggers: result.skill.triggers
      }));

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify({
              query,
              resultsCount: results.length,
              results: formatted
            }, null, 2)
          }
        ]
      };
    }
  );

  console.error('Resources registered: skill://, skill://metadata/, skill://search/');
}
