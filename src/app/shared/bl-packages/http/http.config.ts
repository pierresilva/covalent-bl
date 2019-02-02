export interface HttpClientConfig {
  /**
   * Null value processing, default: `include`
   * - include: contains
   * - ignore: ignore
   */
  nullValueHandling?: 'include' | 'ignore';
  /**
   * Time value processing, default: `timestamp`
   * - timestamp: timestamp
   * - ignore: ignore processing, keep the original state
   */
  dateValueHandling?: 'timestamp' | 'ignore';
}
