import * as fs from 'fs/promises';
import * as path from 'path';
import { homedir } from 'os';

/**
 * Get the skills directory path
 */
export function getSkillsDir(): string {
  return path.join(homedir(), '.claude', 'skills');
}

/**
 * Scan the skills directory for SKILL.md files
 */
export async function scanSkillsDirectory(): Promise<string[]> {
  const skillsDir = getSkillsDir();
  const skillFiles: string[] = [];

  try {
    const entries = await fs.readdir(skillsDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillMdPath = path.join(skillsDir, entry.name, 'SKILL.md');

        try {
          await fs.access(skillMdPath);
          skillFiles.push(skillMdPath);
        } catch {
          // SKILL.md doesn't exist in this directory, skip
          console.error(`No SKILL.md found in ${entry.name}, skipping`);
        }
      }
    }

    return skillFiles;
  } catch (error) {
    console.error(`Error scanning skills directory ${skillsDir}:`, error);
    return [];
  }
}

/**
 * Check if a path is a valid skill directory
 */
export async function isValidSkillDirectory(dirPath: string): Promise<boolean> {
  try {
    const skillMdPath = path.join(dirPath, 'SKILL.md');
    await fs.access(skillMdPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get skill name from directory name
 */
export function getSkillName(skillFilePath: string): string {
  return path.basename(path.dirname(skillFilePath));
}
