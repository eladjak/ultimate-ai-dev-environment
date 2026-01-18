import type { SkillMetadata, SearchResult, SkillRecommendation } from '../types.js';

/**
 * Simple in-memory search index for skills
 */
export class SkillIndex {
  private skills: Map<string, SkillMetadata> = new Map();

  /**
   * Add a skill to the index
   */
  add(skill: SkillMetadata): void {
    this.skills.set(skill.name, skill);
  }

  /**
   * Remove a skill from the index
   */
  remove(skillName: string): void {
    this.skills.delete(skillName);
  }

  /**
   * Clear all skills from the index
   */
  clear(): void {
    this.skills.clear();
  }

  /**
   * Get a skill by name
   */
  get(skillName: string): SkillMetadata | undefined {
    return this.skills.get(skillName);
  }

  /**
   * Get all skills
   */
  getAll(): SkillMetadata[] {
    return Array.from(this.skills.values());
  }

  /**
   * Get count of indexed skills
   */
  count(): number {
    return this.skills.size;
  }

  /**
   * Search skills by query
   */
  search(query: string, limit = 10): SearchResult[] {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);

    const results: SearchResult[] = [];

    for (const skill of this.skills.values()) {
      const score = this.calculateRelevanceScore(skill, queryLower, queryWords);

      if (score > 0) {
        const matchedFields = this.getMatchedFields(skill, queryLower, queryWords);
        results.push({ skill, score, matchedFields });
      }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, limit);
  }

  /**
   * Recommend skills based on user request
   */
  recommend(userRequest: string, limit = 5): SkillRecommendation[] {
    const requestLower = userRequest.toLowerCase();
    const requestWords = requestLower.split(/\s+/).filter(w => w.length > 2);

    const recommendations: SkillRecommendation[] = [];

    for (const skill of this.skills.values()) {
      const confidence = this.calculateConfidence(skill, requestLower, requestWords);

      if (confidence > 0.1) {
        const reason = this.generateRecommendationReason(skill, requestLower, requestWords);
        recommendations.push({ skill, confidence, reason });
      }
    }

    // Sort by confidence descending
    recommendations.sort((a, b) => b.confidence - a.confidence);

    return recommendations.slice(0, limit);
  }

  /**
   * Calculate relevance score for search
   */
  private calculateRelevanceScore(
    skill: SkillMetadata,
    query: string,
    queryWords: string[]
  ): number {
    let score = 0;

    const nameLower = skill.name.toLowerCase();
    const descLower = skill.description.toLowerCase();
    const contentLower = skill.content.toLowerCase();
    const triggersLower = skill.triggers.map(t => t.toLowerCase());

    // Exact name match (highest priority)
    if (nameLower === query) {
      score += 100;
    } else if (nameLower.includes(query)) {
      score += 50;
    }

    // Name word matches
    queryWords.forEach(word => {
      if (nameLower.includes(word)) {
        score += 30;
      }
    });

    // Trigger matches (high priority)
    triggersLower.forEach(trigger => {
      if (trigger === query) {
        score += 40;
      } else if (trigger.includes(query)) {
        score += 20;
      }

      queryWords.forEach(word => {
        if (trigger.includes(word)) {
          score += 15;
        }
      });
    });

    // Description matches
    if (descLower.includes(query)) {
      score += 25;
    }

    queryWords.forEach(word => {
      if (descLower.includes(word)) {
        score += 10;
      }
    });

    // Content matches (lower priority but still relevant)
    queryWords.forEach(word => {
      const matches = (contentLower.match(new RegExp(word, 'g')) || []).length;
      score += Math.min(matches * 2, 10); // Cap at 10 points per word
    });

    return score;
  }

  /**
   * Calculate confidence for recommendation
   */
  private calculateConfidence(
    skill: SkillMetadata,
    request: string,
    requestWords: string[]
  ): number {
    let confidence = 0;

    const nameLower = skill.name.toLowerCase();
    const descLower = skill.description.toLowerCase();
    const triggersLower = skill.triggers.map(t => t.toLowerCase());

    // Check for exact trigger match
    triggersLower.forEach(trigger => {
      if (request.includes(trigger) && trigger.length > 3) {
        confidence += 0.3;
      }
    });

    // Check for name mention
    if (request.includes(nameLower)) {
      confidence += 0.4;
    }

    // Check for keyword matches in description
    requestWords.forEach(word => {
      if (descLower.includes(word)) {
        confidence += 0.1;
      }

      triggersLower.forEach(trigger => {
        if (trigger.includes(word) || word.includes(trigger)) {
          confidence += 0.15;
        }
      });
    });

    // Cap at 1.0
    return Math.min(confidence, 1.0);
  }

  /**
   * Get fields that matched the query
   */
  private getMatchedFields(
    skill: SkillMetadata,
    query: string,
    queryWords: string[]
  ): string[] {
    const matched: string[] = [];

    const nameLower = skill.name.toLowerCase();
    const descLower = skill.description.toLowerCase();
    const triggersLower = skill.triggers.map(t => t.toLowerCase());

    if (nameLower.includes(query) || queryWords.some(w => nameLower.includes(w))) {
      matched.push('name');
    }

    if (descLower.includes(query) || queryWords.some(w => descLower.includes(w))) {
      matched.push('description');
    }

    if (triggersLower.some(t => t.includes(query) || queryWords.some(w => t.includes(w)))) {
      matched.push('triggers');
    }

    return matched;
  }

  /**
   * Generate recommendation reason
   */
  private generateRecommendationReason(
    skill: SkillMetadata,
    request: string,
    requestWords: string[]
  ): string {
    const reasons: string[] = [];

    const nameLower = skill.name.toLowerCase();
    const descLower = skill.description.toLowerCase();
    const triggersLower = skill.triggers.map(t => t.toLowerCase());

    // Check triggers
    const matchedTriggers = triggersLower.filter(t => request.includes(t) && t.length > 3);
    if (matchedTriggers.length > 0) {
      reasons.push(`Matches triggers: ${matchedTriggers.slice(0, 3).join(', ')}`);
    }

    // Check name
    if (request.includes(nameLower)) {
      reasons.push(`Skill name mentioned in request`);
    }

    // Check keywords
    const matchedWords = requestWords.filter(w => descLower.includes(w));
    if (matchedWords.length > 0) {
      reasons.push(`Relevant keywords: ${matchedWords.slice(0, 3).join(', ')}`);
    }

    // Fallback to description excerpt
    if (reasons.length === 0) {
      const excerpt = skill.description.substring(0, 80);
      reasons.push(`General match: ${excerpt}...`);
    }

    return reasons.join('; ');
  }
}
