const { execSync } = require("child_process");

const commitMessage = "[FIX] AMS-4:Fix swagger"; 
try {
  console.log("Pulling latest changes...");
  execSync("git pull origin main", { stdio: "inherit" });

  console.log("Staging all changes...");
  execSync("git add .", { stdio: "inherit" });

  console.log("Committing changes...");
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

  console.log("Pushing to origin/main...");
  execSync("git push origin main", { stdio: "inherit" });

  console.log("Code successfully committed and pushed!");
} catch (error) {
  console.error("An error occurred during the Git operations:", error.message);
}
