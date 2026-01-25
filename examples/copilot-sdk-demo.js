/**
 * GitHub Copilot SDK - Demo Example
 *
 * This example demonstrates how to use the GitHub Copilot SDK
 * to embed agentic workflows in your applications.
 *
 * Prerequisites:
 * 1. npm install @github/copilot-sdk
 * 2. GitHub Copilot CLI installed and authenticated
 *
 * Run: node copilot-sdk-demo.js
 */

// Uncomment when @github/copilot-sdk is installed:
// import { CopilotClient } from "@github/copilot-sdk";

async function main() {
  console.log("🤖 GitHub Copilot SDK Demo\n");

  try {
    // Uncomment when SDK is installed:
    /*
    // 1. Create and start the client
    console.log("Starting Copilot client...");
    const client = new CopilotClient();
    await client.start();
    console.log("✅ Client started\n");

    // 2. Create a session
    console.log("Creating session...");
    const session = await client.createSession({
      model: "gpt-5",
      streaming: true,
      systemMessage: "You are a helpful coding assistant."
    });
    console.log("✅ Session created\n");

    // 3. Listen for events
    session.on("assistant.message_delta", (event) => {
      // Stream response chunks
      process.stdout.write(event.data.deltaContent);
    });

    session.on("assistant.message", (event) => {
      console.log("\n\n✅ Complete response received");
    });

    session.on("tool.execution_start", (event) => {
      console.log(`\n🔧 Tool executing: ${event.data.toolName}`);
    });

    // 4. Send a prompt
    console.log("Sending prompt...\n");
    await session.send({
      prompt: "Write a simple hello world function in JavaScript"
    });

    // Wait for response
    await new Promise(resolve => {
      session.on("session.idle", resolve);
    });

    // 5. Cleanup
    console.log("\n\nCleaning up...");
    await session.destroy();
    await client.stop();
    console.log("✅ Session ended");
    */

    console.log("📦 To run this demo:");
    console.log("1. Install: npm install @github/copilot-sdk");
    console.log("2. Ensure GitHub Copilot CLI is authenticated");
    console.log("3. Uncomment the code above and run: node copilot-sdk-demo.js\n");

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();

/**
 * Example: Custom Tool Definition
 *
 * Define tools that Copilot can invoke during conversation
 */

/*
import { defineTool } from "@github/copilot-sdk";
import { z } from "zod";

const searchTool = defineTool({
  name: "search_database",
  description: "Search for users in the database",
  parameters: z.object({
    query: z.string().describe("Search query"),
    limit: z.number().optional().describe("Max results")
  }),
  handler: async ({ query, limit = 10 }) => {
    console.log(`Searching for: ${query} (limit: ${limit})`);
    // Your search logic here
    return {
      results: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
      ]
    };
  }
});

// Use in session:
const session = await client.createSession({
  model: "gpt-5",
  tools: [searchTool]
});
*/

/**
 * Example: Session Persistence
 *
 * Resume conversations across restarts
 */

/*
// Save session ID
const session = await client.createSession({
  sessionId: "my-unique-session-id"
});

// Later, resume the session
const resumedSession = await client.resumeSession("my-unique-session-id");
*/

/**
 * Example: Multiple Sessions
 *
 * Manage multiple concurrent conversations
 */

/*
const session1 = await client.createSession({ model: "gpt-5" });
const session2 = await client.createSession({ model: "claude-sonnet-4.5" });

// List all active sessions
const sessions = await client.listSessions();
console.log(`Active sessions: ${sessions.length}`);
*/
