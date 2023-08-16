const execa = require('execa');

// Initialize Next.js
async function watch({ port } = { port: 3000 }) {
  try {
    await execa('yarn', ['run', 'dev', '--port', port], {
      cwd: 'packages/core/client', // Set the working directory
      stdio: 'inherit', // To use the parent's stdio for output
    });
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  watch,
};
