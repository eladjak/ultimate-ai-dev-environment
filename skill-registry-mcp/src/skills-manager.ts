import type { SkillMetadata, SearchResult, SkillRecommendation, ValidationResult } from './types.js';
import { SkillIndex } from './utils/indexer.js';
import { scanSkillsDirectory } from './utils/scanner.js';
import { parseSkillMd, validateSkillMd } from './utils/parser.js';

/**
 * Core manager for skills registry
 */
export class SkillsManager {
  private index: SkillIndex;
  private initialized = false;

  constructor() {
    this.index = new SkillIndex();
  }

  /**
   * Initialize the manager by scanning and indexing all skills
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    console.error('Initializing skills registry...');
    const startTime = Date.now();

    try {
      await this.refresh();
      this.initialized = true;

      const duration = Date.now() - startTime;
      console.error(`Skills registry initialized: ${this.index.count()} skills indexed in ${duration}ms`);
    } catch (error) {
      console.error('Failed to initialize skills registry:', error);
      throw error;
    }
  }

  /**
   * Refresh the registry by re-scanning the skills directory
   */
  async refresh(): Promise<{ skillsFound: number; updated: string[] }> {
    console.error('Scanning skills directory...');

    const skillFiles = await scanSkillsDirectory();
    const updated: string[] = [];

    // Clear existing index
    this.index.clear();

    // Parse and index each skill
    for (const skillFile of skillFiles) {
      try {
        const skill = await parseSkillMd(skillFile);

        if (skill) {
          this.index.add(skill);
          updated.push(skill.name);
        }
      } catch (error) {
        console.error(`Error processing ${skillFile}:`, error);
      }
    }

    return {
      skillsFound: this.index.count(),
      updated
    };
  }

  /**
   * List all skills
   */
  listSkills(options?: {
    category?: string;
    pattern?: string;
  }): SkillMetadata[] {
    let skills = this.index.getAll();

    // Apply pattern filter if provided
    if (options?.pattern) {
      const patternLower = options.pattern.toLowerCase();
      skills = skills.filter(skill =>
        skill.name.toLowerCase().includes(patternLower) ||
        skill.description.toLowerCase().includes(patternLower)
      );
    }

    // Sort by name
    skills.sort((a, b) => a.name.localeCompare(b.name));

    return skills;
  }

  /**
   * Search skills by query
   */
  searchSkills(query: string, limit = 10): SearchResult[] {
    return this.index.search(query, limit);
  }

  /**
   * Get a specific skill by name
   */
  getSkill(name: string): SkillMetadata | undefined {
    return this.index.get(name);
  }

  /**
   * Recommend skills based on user request
   */
  recommendSkills(userRequest: string, limit = 5): SkillRecommendation[] {
    return this.index.recommend(userRequest, limit);
  }

  /**
   * Validate a skill file
   */
  async validateSkill(skillPath: string): Promise<ValidationResult> {
    return await validateSkillMd(skillPath);
  }

  /**
   * Get registry statistics
   */
  getStats(): {
    totalSkills: number;
    initialized: boolean;
  } {
    return {
      totalSkills: this.index.count(),
      initialized: this.initialized
    };
  }

  /**
   * Check if manager is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}
