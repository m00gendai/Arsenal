import * as FileSystem from 'expo-file-system';

// Method 1: Read with explicit encoding and strip BOM
async function readJsonFileSafe(uri) {
  try {
    // Read as string with utf8 encoding
    let content = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.UTF8
    });
    
    // Strip BOM (Byte Order Mark) if present
    // BOM characters: UTF-8: EF BB BF, UTF-16BE: FE FF, UTF-16LE: FF FE
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
      console.log('Stripped BOM character');
    }
    
    // Try to parse
    const parsed = JSON.parse(content);
    return { success: true, data: parsed };
    
  } catch (error) {
    console.error('JSON Parse Error:', error.message);
    return { success: false, error: error.message };
  }
}

// Method 2: Debug the error with context
export async function debugJsonError(uri, contextChars = 200) {
  try {
    let content = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.UTF8
    });
    
    // Strip BOM
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    
    // Check first few characters
    console.log('First 100 characters:', content.substring(0, 100));
    console.log('First 10 char codes:', 
      Array.from(content.substring(0, 10)).map(c => c.charCodeAt(0))
    );
    
    try {
      JSON.parse(content);
      console.log('✓ JSON is valid!');
      return { success: true };
    } catch (e) {
      console.log('✗ JSON Error:', e.message);
      
      // Find error position by incremental parsing
      let errorPos = null;
      let lastValidPos = 0;
      const chunkSize = 1000; // Parse in chunks for performance
      
      for (let i = chunkSize; i < content.length; i += chunkSize) {
        try {
          JSON.parse(content.substring(0, i));
          lastValidPos = i;
        } catch (err) {
          // Error in this chunk, narrow it down
          for (let j = lastValidPos; j < i; j++) {
            try {
              JSON.parse(content.substring(0, j + 1));
            } catch (err2) {
              if (!err2.message.includes('Unexpected end')) {
                errorPos = j;
                break;
              }
            }
          }
          break;
        }
      }
      
      if (errorPos !== null) {
        const start = Math.max(0, errorPos - contextChars);
        const end = Math.min(content.length, errorPos + contextChars);
        
        const before = content.substring(start, errorPos);
        const errorChar = content[errorPos];
        const after = content.substring(errorPos + 1, end);
        
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Error at position: ${errorPos}`);
        console.log(`Error character: '${errorChar}' (code: ${errorChar.charCodeAt(0)})`);
        console.log(`\nContext:`);
        console.log(before + `[[[${errorChar}]]]` + after);
        console.log(`${'='.repeat(50)}\n`);
        
        // Show surrounding char codes
        const regionStart = Math.max(0, errorPos - 5);
        const regionEnd = Math.min(content.length, errorPos + 5);
        console.log('Character codes around error:');
        for (let i = regionStart; i < regionEnd; i++) {
          const char = content[i];
          const marker = i === errorPos ? ' <-- ERROR' : '';
          console.log(`Pos ${i}: '${char}' (code: ${char.charCodeAt(0)})${marker}`);
        }
        
        return { 
          success: false, 
          errorPos, 
          errorChar, 
          charCode: errorChar.charCodeAt(0),
          context: { before, after }
        };
      }
    }
  } catch (error) {
    console.error('File read error:', error);
    return { success: false, error: error.message };
  }
}

// Method 3: Try reading as base64 and converting
async function readJsonAsBase64(uri) {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64
    });
    
    // Decode base64
    const decoded = atob(base64);
    
    // Strip BOM if present
    let content = decoded.charCodeAt(0) === 0xFEFF ? decoded.slice(1) : decoded;
    
    const parsed = JSON.parse(content);
    return { success: true, data: parsed };
  } catch (error) {
    console.error('Base64 method failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Usage Example:
export async function loadJsonFile(fileUri) {
  console.log('Attempting to load JSON file...');
  
  // First, try the safe method
  let result = await readJsonFileSafe(fileUri);
  
  if (result.success) {
    console.log('✓ JSON loaded successfully!');
    return result.data;
  }
  
  // If failed, debug it
  console.log('Safe read failed, debugging...');
  const debugInfo = await debugJsonError(fileUri, 300);
  
  if (!debugInfo.success && debugInfo.errorPos) {
    console.log(`\n⚠️ Found error at position ${debugInfo.errorPos}`);
    console.log(`Problematic character: '${debugInfo.errorChar}' (code: ${debugInfo.charCode})`);
  }
  
  // Try base64 method as fallback
  console.log('Trying base64 method...');
  result = await readJsonAsBase64(fileUri);
  
  if (result.success) {
    console.log('✓ Base64 method worked!');
    return result.data;
  }
  
  throw new Error('Could not load JSON file. Check console for details.');
}