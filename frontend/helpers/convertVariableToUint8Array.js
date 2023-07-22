 function convertVariableToUint8Array(variable) {
    const uint8Array = new Uint8Array(variable.length);
  
    for (let i = 0; i < variable.length; i++) {
      uint8Array[i] = variable.charCodeAt(i);
    }
  
    return uint8Array;
  }
  
  module.exports = {
    convertVariableToUint8Array,
  }
