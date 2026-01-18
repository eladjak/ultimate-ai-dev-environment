import * as fs from 'fs/promises';
import * as path from 'path';
import * as YAML from 'yaml';
import type { SkillMetadata, ValidationResult } from '../types.js';

/**
 * Parse a SKILL.md file and extract metadata
 */
export async function parseSkillMd(filePath: string): Promise<SkillMetadata | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = await fs.stat(filePath);

    // Extract YAML front matter
    const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);

    let name = '';
    let description = '';
    let triggers: string[] = [];
    let bodyContent = content;

    if (frontMatterMatch) {
      try {
        const frontMatter = YAML.parse(frontMatterMatch[1]);
        name = frontMatter.name || '';
        description = frontMatter.description || '';

        // Extract body content (everything after front matter)
        bodyContent = content.substring(frontMatterMatch[0].length).trim();
      } catch (yamlError) {
        console.error(`YAML parsing error in ${filePath}:`, yamlError);
      }
    }

    // Fallback: use directory name if name not in front matter
    if (!name) {
      name = path.basename(path.dirname(filePath));
    }

    // Extract triggers from description
    triggers = extractTriggers(description, bodyContent);

    return {
      name,
      description,
      triggers,
      content: bodyContent,
      path: filePath,
      lastModified: stats.mtime
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Extract trigger keywords from description and content
 */
function extractTriggers(description: string, content: string): string[] {
  const triggers = new Set<string>();

  // Extract from description
  const descLower = description.toLowerCase();

  // Pattern 1: "Triggers on X, Y, Z"
  const triggersMatch = descLower.match(/triggers?\s+on[:\s]+([^.]+)/i);
  if (triggersMatch) {
    const words = triggersMatch[1].split(/[,;]+/).map(w => w.trim());
    words.forEach(w => triggers.add(w));
  }

  // Pattern 2: "Use when ..." - extract key phrases
  const useWhenMatch = descLower.match(/use\s+when[:\s]+([^.]+)/i);
  if (useWhenMatch) {
    const words = useWhenMatch[1].split(/\s+/).filter(w => w.length > 3);
    words.forEach(w => triggers.add(w));
  }

  // Pattern 3: Extract technology names (capitalized words)
  const techNames = description.match(/\b[A-Z][a-zA-Z]+\b/g);
  if (techNames) {
    techNames.forEach(tech => triggers.add(tech.toLowerCase()));
  }

  // Pattern 4: Extract from first heading in content
  const firstHeading = content.match(/^#\s+(.+)$/m);
  if (firstHeading) {
    const words = firstHeading[1].toLowerCase().split(/\s+/).filter(w => w.length > 3);
    words.forEach(w => triggers.add(w));
  }

  return Array.from(triggers);
}

/**
 * Validate a SKILL.md file
 */
export async function validateSkillMd(filePath: string): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Check if file exists
    await fs.access(filePath);
  } catch {
    errors.push(`File does not exist: ${filePath}`);
    return { valid: false, errors, warnings };
  }

  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Check for YAML front matter
    const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);

    if (!frontMatterMatch) {
      warnings.push('No YAML front matter found');
    } else {
      try {
        const frontMatter = YAML.parse(frontMatterMatch[1]);

        // Validate required fields
        if (!frontMatter.name) {
          errors.push('Missing required field: name');
        }

        if (!frontMatter.description) {
          warnings.push('Missing description field');
        } else if (frontMatter.description.length < 10) {
          warnings.push('Description is too short (< 10 characters)');
        }
      } catch (yamlError) {
        errors.push(`Invalid YAML syntax: ${yamlError}`);
      }
    }

    // Check for content
    const bodyContent = frontMatterMatch
      ? content.substring(frontMatterMatch[0].length).trim()
      : content.trim();

    if (bodyContent.length === 0) {
      errors.push('Skill has no content');
    } else if (bodyContent.length < 100) {
      warnings.push('Skill content is very short (< 100 characters)');
    }

    // Check for headings
    if (!bodyContent.match(/^#+\s+/m)) {
      warnings.push('No headings found in content');
    }

  } catch (error) {
    errors.push(`Error reading file: ${error}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
