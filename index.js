#!/usr/bin/env node

// entry point
(async () => {
    const args = process.argv.slice(2);
    const userName = (args[0] || "d-shaktiranjan").trim().replace(/^@/, "");

    try {
        const userData = await fetchGitHubUser(userName);
        if (!userData) {
            throw new Error("No data found for the specified user.");
        }
        displayDevCard(userData);
    } catch (err) {
        console.error(`❌ ${err.message}`);
    }
})();

// fetch GitHub user data
async function fetchGitHubUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
        // Provide a meaningful message based on status
        if (response.status === 404) {
            throw new Error(`User "${username}" not found on GitHub.`);
        } else {
            throw new Error(
                `GitHub API error: ${response.status} ${response.statusText}`
            );
        }
    }

    return await response.json();
}

// display the developer card in a styled box
function displayDevCard(user) {
    // ANSI escape codes for formatting
    const RESET = "\x1b[0m";
    const BOLD = "\x1b[1m";
    const CYAN = "\x1b[36m";
    const BLUE = "\x1b[34m";
    const GREEN = "\x1b[32m";
    const MAGENTA = "\x1b[35m";
    const YELLOW = "\x1b[33m";

    const lines = [];

    // header
    const name = `${BLUE}${user.name}${RESET}`;
    const bio = user.bio || "a developer";
    const company = user.company
        ? user.company.startsWith("@")
            ? ` ${GREEN}${user.company}${RESET}`
            : ` @ ${GREEN}${user.company}${RESET}`
        : "";

    lines.push(`${BOLD}Hey there!${RESET} I'm ${name} — ${bio}${company}`);

    // additional details
    if (user.location)
        lines.push(`📍 Location : ${CYAN}${user.location}${RESET}`);
    if (user.html_url)
        lines.push(`💼 GitHub   : ${BLUE}${user.html_url}${RESET}`);
    if (user.blog) lines.push(`📰 Blog     : ${MAGENTA}${user.blog}${RESET}`);
    if (user.twitter_username)
        lines.push(
            `🐦 X        : ${BLUE}https://x.com/${user.twitter_username}${RESET}`
        );
    if (user.email) lines.push(`✉️  Email    : ${CYAN}${user.email}${RESET}`);
    if (user.created_at)
        lines.push(
            `📅 Joined   : ${YELLOW}${new Date(
                user.created_at
            ).toDateString()}${RESET}`
        );

    lines.push(
        `📂 Repos    : ${YELLOW}${user.public_repos}${RESET} | Gists: ${YELLOW}${user.public_gists}${RESET}`
    );
    lines.push(
        `👥 Followers: ${user.followers} | Following: ${user.following}`
    );

    // calculate box width based on visible text length
    const maxLineLength = Math.max(
        ...lines.map((line) => line.replace(/\x1b\[[0-9;]*m/g, "").length)
    );
    const horizontalBorder = "─".repeat(maxLineLength + 2);

    // print the boxed output
    console.log(`┌${horizontalBorder}┐`);
    for (const line of lines) {
        const visibleLength = line.replace(/\x1b\[[0-9;]*m/g, "").length;
        const padding = " ".repeat(maxLineLength - visibleLength);
        console.log(`│ ${line}${padding} │`);
    }
    console.log(`└${horizontalBorder}┘`);
}
