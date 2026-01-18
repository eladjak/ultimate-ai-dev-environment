#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { SkillsManager } from './skills-manager.js';
import { registerResources } from './resources.js';

// Import tool handlers
import { ListSkillsSchema, handleListSkills } from './tools/list-skills.js';
import { SearchSkillsSchema, handleSearchSkills } from './tools/search-skills.js';
import { GetSkillSchema, handleGetSkill } from './tools/get-skill.js';
import { RecommendSkillSchema, handleRecommendSkill } from './tools/recommend-skill.js';
import { ValidateSkillSchema, handleValidateSkill } from './tools/validate-skill.js';
import { RefreshRegistrySchema, handleRefreshRegistry } from './tools/refresh-registry.js';

async function main() {
  console.error('Starting Skill Registry MCP Server...');

  // Initialize skills manager
  const manager = new SkillsManager();

  try {
    await manager.initialize();
  } catch (error) {
    console.error('Failed to initialize skills manager:', error);
    process.exit(1);
  }

  // Create MCP server
  const server = new McpServer({
    name: 'skill-registry',
    version: '1.0.0'
  });

  // Register resources
  registerResources(server, manager);

  // Register tools

  // Tool 1: list_skills
  server.tool(
    'list_skills',
    'List all available Claude Code skills. Use pattern parameter to filter by name or description.',
    ListSkillsSchema.shape,
    async (args) => {
      try {
        return await handleListSkills(manager, args);
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: error.message }, null, 2)
            }
          ]
        };
      }
    }
  );

  // Tool 2: search_skills
  server.tool(
    'search_skills',
    'Search skills by keywords, technology names, or descriptions. Returns ranked results with relevance scores.',
    SearchSkillsSchema.shape,
    async (args) => {
      try {
        return await handleSearchSkills(manager, args);
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: error.message }, null, 2)
            }
          ]
        };
      }
    }
  );

  // Tool 3: get_skill
  server.tool(
    'get_skill',
    'Get the full content of a specific skill by name. Returns metadata and complete skill documentation.',
    GetSkillSchema.shape,
    async (args) => {
      try {
        return await handleGetSkill(manager, args);
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: error.message }, null, 2)
            }
          ]
        };
      }
    }
  );

  // Tool 4: recommend_skill
  server.tool(
    'recommend_skill',
    'Get skill recommendations based on a user request. Analyzes the request and suggests the most relevant skills with confidence scores and reasoning.',
    RecommendSkillSchema.shape,
    async (args) => {
      try {
        return await handleRecommendSkill(manager, args);
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: error.message }, null, 2)
            }
          ]
        };
      }
    }
  );

  // Tool 5: validate_skill
  server.tool(
    'validate_skill',
    'Validate a SKILL.md file format and structure. Checks for required fields, proper YAML front matter, and content quality.',
    ValidateSkillSchema.shape,
    async (args) => {
      try {
        return await handleValidateSkill(manager, args);
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: error.message }, null, 2)
            }
          ]
        };
      }
    }
  );

  // Tool 6: refresh_registry
  server.tool(
    'refresh_registry',
    'Refresh the skills registry by re-scanning the ~/.claude/skills directory. Use this after installing new skills.',
    RefreshRegistrySchema.shape,
    async (args) => {
      try {
        return await handleRefreshRegistry(manager, args);
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: error.message }, null, 2)
            }
          ]
        };
      }
    }
  );

  console.error('All tools registered: list_skills, search_skills, get_skill, recommend_skill, validate_skill, refresh_registry');

  // Connect to stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Skill Registry MCP Server running on stdio');
  console.error(`Managing ${manager.getStats().totalSkills} skills`);

  // Keep process alive
  process.stdin.resume();
}

// Handle errors
main().catch((error) => {
  console.error('Fatal error in MCP server:', error);
  process.exit(1);
});
