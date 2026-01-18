/**
 * Skill metadata extracted from SKILL.md
 */
export interface SkillMetadata {
  name: string;
  description: string;
  triggers: string[];
  content: string;
  path: string;
  lastModified: Date;
}

/**
 * Search result with relevance score
 */
export interface SearchResult {
  skill: SkillMetadata;
  score: number;
  matchedFields: string[];
}

/**
 * Skill recommendation with reasoning
 */
export interface SkillRecommendation {
  skill: SkillMetadata;
  confidence: number;
  reason: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
