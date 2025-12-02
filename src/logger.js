const chalk = require('chalk');

/**
 * Logger utility for console output with colors
 */
const logger = {
  info: (message) => {
    console.log(chalk.blue('ℹ'), message);
  },
  
  success: (message) => {
    console.log(chalk.green('✓'), message);
  },
  
  error: (message) => {
    console.error(chalk.red('✗'), message);
  },
  
  warn: (message) => {
    console.warn(chalk.yellow('⚠'), message);
  },
  
  log: (message) => {
    console.log(message);
  }
};

module.exports = logger;

