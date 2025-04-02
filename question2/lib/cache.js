class Cache {
    constructor(ttl = 60000) { // Default TTL: 1 minute
      this.cache = new Map();
      this.ttl = ttl;
    }
  
    get(key) {
      const item = this.cache.get(key);
      if (!item) return null;
  
      const now = Date.now();
      if (now > item.expiry) {
        this.cache.delete(key);
        return null;
      }
  
      return item.value;
    }
  
    set(key, value, customTtl) {
      const ttl = customTtl || this.ttl;
      const expiry = Date.now() + ttl;
      this.cache.set(key, { value, expiry });
    }
  
    invalidate(key) {
      this.cache.delete(key);
    }
  
    invalidateAll() {
      this.cache.clear();
    }
  }
  
  // Create cache instances with different TTLs
  export const userCache = new Cache(300000); // 5 minutes
  export const postCache = new Cache(60000);  // 1 minute
  export const commentCache = new Cache(30000); // 30 seconds
  