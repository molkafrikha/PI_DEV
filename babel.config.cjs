module.exports = function(api) {
    api.cache(true);
  
    const presets = [
      "@babel/preset-env",
      // Add any other presets you need here
    ];
  
    const plugins = [
      // Add any Babel plugins you need here
    ];
  
    return {
      presets,
      plugins
    };
  }
  