const args = process.argv.slice(2);
const userName = (args[0] || "d-shaktiranjan").trim().replace(/@/, "");

getUserData(userName).then((data) => {
    if (data) {
        showDevCard(data);
    } else {
        console.error("No data found for the specified user.");
    }
});

function showDevCard(data) {
    // ANSI escape codes
    const RESET = "\x1b[0m";
    const CYAN = "\x1b[36m";
    const BLUE = "\x1b[34m";
    const GREEN = "\x1b[32m";
    const MAGENTA = "\x1b[35m";
    const YELLOW = "\x1b[33m";
    const BOLD = "\x1b[1m";

    const lines = [];

    // Header
    lines.push(
        `${BOLD}Hey there!${RESET} I'm ${BLUE}${data.name}${RESET} — ${
            data.bio || "a developer"
        }${data.company ? ` @ ${GREEN}${data.company}${RESET}` : ""}`
    );
    if (data.location)
        lines.push(`📍 Location : ${CYAN}${data.location}${RESET}`);
    if (data.html_url)
        lines.push(`💼 GitHub   : ${BLUE}${data.html_url}${RESET}`);
    if (data.blog) lines.push(`📰 Blog     : ${MAGENTA}${data.blog}${RESET}`);
    if (data.twitter_username)
        lines.push(
            `🐦 Twitter  : ${BLUE}https://twitter.com/${data.twitter_username}${RESET}`
        );
    if (data.created_at)
        lines.push(
            `📅 Joined   : ${YELLOW}${new Date(
                data.created_at
            ).toDateString()}${RESET}`
        );
    lines.push(
        `📂 Repos    : ${YELLOW}${data.public_repos}${RESET} | Gists: ${YELLOW}${data.public_gists}${RESET}`
    );
    lines.push(
        `👥 Followers: ${data.followers} | Following: ${data.following}`
    );

    // Compute the max width of the visible line content (excluding escape codes)
    const visibleLengths = lines.map(
        (line) => line.replace(/\x1b\[[0-9;]*m/g, "").length
    );
    const maxLength = Math.max(...visibleLengths);
    const horizontal = "─".repeat(maxLength + 2);

    // Create box
    console.log(`┌${horizontal}┐`);
    lines.forEach((line) => {
        const visibleLength = line.replace(/\x1b\[[0-9;]*m/g, "").length;
        const padding = " ".repeat(maxLength - visibleLength);
        console.log(`│ ${line}${padding} │`);
    });
    console.log(`└${horizontal}┘`);
}

async function getUserData(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        console.error("Error fetching user data:", response.statusText);
        return null;
    }
    const data = await response.json();
    return data;
}
