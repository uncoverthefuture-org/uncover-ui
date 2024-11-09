export const generateRandomStringWithTimestamp = (length = 12, seperator = '_') => {
    // Generate a random 12-character string
    const randomPart = Math.random().toString(36).substring(2, (length + 2));
    
    // Get current timestamp in milliseconds
    const timestamp = Date.now();
    
    // Convert timestamp to base 36 and take the last 8 characters
    const timestampPart = timestamp.toString(36).slice(-8);
    
    // Combine random string and timestamp
    return randomPart + seperator + timestampPart;
  }