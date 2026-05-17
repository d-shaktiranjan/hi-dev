#!/usr/bin/env node

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const CYAN = "\x1b[36m";
const BLUE = "\x1b[34m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";
const NPM_PACKAGE_URL = "https://www.npmjs.com/package/hi-dev";
const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;
const MIN_CONTENT_WIDTH = 60;
const BOX_HORIZONTAL_CHROME = 4;

const BIG_LETTERS = {
    A: [" █████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
    B: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██████╔╝", "╚═════╝ "],
    C: [" ██████╗", "██╔════╝", "██║     ", "██║     ", "╚██████╗", " ╚═════╝"],
    D: ["██████╗ ", "██╔══██╗", "██║  ██║", "██║  ██║", "██████╔╝", "╚═════╝ "],
    E: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "███████╗", "╚══════╝"],
    F: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "██║     ", "╚═╝     "],
    G: [
        " ██████╗ ",
        "██╔════╝ ",
        "██║  ███╗",
        "██║   ██║",
        "╚██████╔╝",
        " ╚═════╝ ",
    ],
    H: ["██╗  ██╗", "██║  ██║", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
    I: ["██╗", "██║", "██║", "██║", "██║", "╚═╝"],
    J: ["     ██╗", "     ██║", "     ██║", "██   ██║", "╚█████╔╝", " ╚════╝ "],
    K: ["██╗  ██╗", "██║ ██╔╝", "█████╔╝ ", "██╔═██╗ ", "██║  ██╗", "╚═╝  ╚═╝"],
    L: ["██╗     ", "██║     ", "██║     ", "██║     ", "███████╗", "╚══════╝"],
    M: [
        "███╗   ███╗",
        "████╗ ████║",
        "██╔████╔██║",
        "██║╚██╔╝██║",
        "██║ ╚═╝ ██║",
        "╚═╝     ╚═╝",
    ],
    N: [
        "███╗   ██╗",
        "████╗  ██║",
        "██╔██╗ ██║",
        "██║╚██╗██║",
        "██║ ╚████║",
        "╚═╝  ╚═══╝",
    ],
    O: [
        " ██████╗ ",
        "██╔═══██╗",
        "██║   ██║",
        "██║   ██║",
        "╚██████╔╝",
        " ╚═════╝ ",
    ],
    P: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔═══╝ ", "██║     ", "╚═╝     "],
    Q: [
        " ██████╗ ",
        "██╔═══██╗",
        "██║   ██║",
        "██║▄▄ ██║",
        "╚██████╔╝",
        " ╚══▀▀═╝ ",
    ],
    R: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██║  ██║", "╚═╝  ╚═╝"],
    S: ["███████╗", "██╔════╝", "███████╗", "╚════██║", "███████║", "╚══════╝"],
    T: [
        "████████╗",
        "╚══██╔══╝",
        "   ██║   ",
        "   ██║   ",
        "   ██║   ",
        "   ╚═╝   ",
    ],
    U: [
        "██╗   ██╗",
        "██║   ██║",
        "██║   ██║",
        "██║   ██║",
        "╚██████╔╝",
        " ╚═════╝ ",
    ],
    V: [
        "██╗   ██╗",
        "██║   ██║",
        "██║   ██║",
        "╚██╗ ██╔╝",
        " ╚████╔╝ ",
        "  ╚═══╝  ",
    ],
    W: [
        "██╗    ██╗",
        "██║    ██║",
        "██║ █╗ ██║",
        "██║███╗██║",
        "╚███╔███╔╝",
        " ╚══╝╚══╝ ",
    ],
    X: ["██╗  ██╗", "╚██╗██╔╝", " ╚███╔╝ ", " ██╔██╗ ", "██╔╝ ██╗", "╚═╝  ╚═╝"],
    Y: [
        "██╗   ██╗",
        "╚██╗ ██╔╝",
        " ╚████╔╝ ",
        "  ╚██╔╝  ",
        "   ██║   ",
        "   ╚═╝   ",
    ],
    Z: ["███████╗", "╚══███╔╝", "  ███╔╝ ", " ███╔╝  ", "███████╗", "╚══════╝"],
    0: [
        " ██████╗ ",
        "██╔═████╗",
        "██║██╔██║",
        "████╔╝██║",
        "╚██████╔╝",
        " ╚═════╝ ",
    ],
    1: [" ██╗", "███║", "╚██║", " ██║", " ██║", " ╚═╝"],
    2: ["██████╗ ", "╚════██╗", " █████╔╝", "██╔═══╝ ", "███████╗", "╚══════╝"],
    3: ["██████╗ ", "╚════██╗", " █████╔╝", " ╚═══██╗", "██████╔╝", "╚═════╝ "],
    4: ["██╗  ██╗", "██║  ██║", "███████║", "╚════██║", "     ██║", "     ╚═╝"],
    5: ["███████╗", "██╔════╝", "███████╗", "╚════██║", "███████║", "╚══════╝"],
    6: [
        " ██████╗ ",
        "██╔════╝ ",
        "███████╗ ",
        "██╔═══██╗",
        "╚██████╔╝",
        " ╚═════╝ ",
    ],
    7: ["███████╗", "╚════██║", "    ██╔╝", "   ██╔╝ ", "   ██║  ", "   ╚═╝  "],
    8: [" █████╗ ", "██╔══██╗", "╚█████╔╝", "██╔══██╗", "╚█████╔╝", " ╚════╝ "],
    9: [" █████╗ ", "██╔══██╗", "╚██████║", " ╚═══██║", " █████╔╝", " ╚════╝ "],
    "-": [
        "        ",
        "        ",
        "███████╗",
        "╚══════╝",
        "        ",
        "        ",
    ],
    _: ["        ", "        ", "        ", "        ", "███████╗", "╚══════╝"],
    ".": ["   ", "   ", "   ", "   ", "██╗", "╚═╝"],
};

(async () => {
    const args = process.argv.slice(2);
    const userName = (args[0] || "d-shaktiranjan").trim().replace(/^@/, "");

    try {
        const [userData, contributionData] = await Promise.all([
            fetchGitHubUser(userName),
            fetchGitHubContributions(userName),
        ]);

        displayDevCard(userData, contributionData, userName);
    } catch (err) {
        console.error(`❌ ${err.message}`);
        process.exitCode = 1;
    }
})();

async function fetchGitHubUser(username) {
    const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}`,
    );

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`User "${username}" not found on GitHub.`);
        }

        throw new Error(
            `GitHub API error: ${response.status} ${response.statusText}`,
        );
    }

    return await response.json();
}

async function fetchGitHubContributions(username) {
    const response = await fetch(
        `${CONTRIBUTIONS_API}/${encodeURIComponent(username)}`,
    );

    if (!response.ok) {
        throw new Error(
            `GitHub contributions API error: ${response.status} ${response.statusText}`,
        );
    }

    return await response.json();
}

function displayDevCard(user, activity, requestedUsername) {
    const login = user.login || requestedUsername;
    const profileUrl = user.html_url || `https://github.com/${login}`;
    const totalByYear = normalizeYearTotals(activity.total);
    const contributions = Array.isArray(activity.contributions)
        ? activity.contributions
        : [];
    const summary = getContributionSummary(totalByYear, contributions);
    const joinedDate = user.created_at ? new Date(user.created_at) : null;
    const terminalContentWidth = getTerminalContentWidth();
    const contentWidth = getContentWidth(login, terminalContentWidth);
    const lines = [];

    addLines(lines, renderBanner(login, contentWidth));
    lines.push(separator());
    lines.push(`👨‍💻  ${BOLD}${user.name || login}${RESET}`);
    lines.push(`🚀  ${formatRoleLine(user)}`);
    if (user.location) lines.push(`📍  ${user.location}`);
    lines.push("");
    lines.push(`🔗  ${formatLink(profileUrl)}`);
    if (user.blog) lines.push(`🌐  ${formatLink(normalizeUrl(user.blog))}`);
    if (user.twitter_username) {
        lines.push(
            `🐦  ${formatLink(`https://x.com/${user.twitter_username}`)}`,
        );
    }

    lines.push(separator());
    lines.push(`📊 ${BOLD}GitHub Stats${RESET}`);
    addLines(
        lines,
        renderStats([
            ["Repositories", user.public_repos, "Gists", user.public_gists],
            ["Followers", user.followers, "Following", user.following],
            [
                "GitHub Age",
                joinedDate ? `${getGitHubAge(joinedDate)}y+` : "N/A",
                "Contributions",
                summary.total,
            ],
        ]),
    );

    if (totalByYear.length > 0) {
        lines.push(separator());
        lines.push(`📈 ${BOLD}Contribution Timeline${RESET}`);
        addLines(
            lines,
            renderTimeline(totalByYear, summary.peakYear, contentWidth),
        );
    }

    lines.push(separator());
    if (summary.peakYear) {
        lines.push(
            `⚡ Peak Year      : ${YELLOW}${summary.peakYear.year}${RESET} (${summary.peakYear.total} contributions)`,
        );
    }
    lines.push(
        `🏆 Highest Daily  : ${YELLOW}${summary.highestDaily}${RESET} contributions`,
    );
    if (joinedDate) {
        lines.push(
            `📅 Joined GitHub  : ${YELLOW}${joinedDate.toDateString()}${RESET}`,
        );
    }

    lines.push(separator());
    lines.push(`📦 npm package    : ${formatLink(NPM_PACKAGE_URL)}`);
    lines.push(
        `💡 Create yours   : run ${CYAN}npx hi-dev your-user-name${RESET}`,
    );

    printBox(lines, contentWidth);
}

function normalizeYearTotals(total) {
    if (!total || typeof total !== "object") return [];

    return Object.entries(total)
        .filter(
            ([year, value]) =>
                /^\d{4}$/.test(year) && Number.isFinite(Number(value)),
        )
        .map(([year, value]) => ({ year, total: Number(value) }))
        .sort((a, b) => Number(a.year) - Number(b.year));
}

function getContributionSummary(totalByYear, contributions) {
    const total = totalByYear.reduce((sum, item) => sum + item.total, 0);
    const peakYear = totalByYear.reduce((peak, item) => {
        if (!peak || item.total > peak.total) return item;
        return peak;
    }, null);
    const highestDaily = contributions.reduce((max, item) => {
        const count = Number(item.count) || 0;
        return Math.max(max, count);
    }, 0);

    return { total, peakYear, highestDaily };
}

function renderBanner(text, contentWidth) {
    const chunks = chunkBannerText(
        text.toUpperCase(),
        Math.max(32, contentWidth + 1),
    );
    const output = [];

    for (const chunk of chunks) {
        const rows = Array.from({ length: 6 }, () => "");

        for (const char of chunk) {
            const letter = BIG_LETTERS[char] || BIG_LETTERS["."];

            for (let row = 0; row < rows.length; row += 1) {
                rows[row] += `${letter[row]} `;
            }
        }

        output.push(...rows.map((row) => `${CYAN}${row.trimEnd()}${RESET}`));
        if (chunk !== chunks[chunks.length - 1]) output.push("");
    }

    return output;
}

function getBannerWidth(text) {
    const rows = Array.from({ length: 6 }, () => "");

    for (const char of text.toUpperCase()) {
        const letter = BIG_LETTERS[char] || BIG_LETTERS["."];

        for (let row = 0; row < rows.length; row += 1) {
            rows[row] += `${letter[row]} `;
        }
    }

    return Math.max(...rows.map((row) => displayWidth(row.trimEnd())));
}

function chunkBannerText(text, maxWidth) {
    const chunks = [];
    let current = "";
    let currentWidth = 0;

    for (const char of text) {
        const letter = BIG_LETTERS[char] || BIG_LETTERS["."];
        const width = displayWidth(letter[0]) + 1;

        if (current && currentWidth + width > maxWidth) {
            chunks.push(current);
            current = "";
            currentWidth = 0;
        }

        current += char;
        currentWidth += width;
    }

    if (current) chunks.push(current);
    return chunks;
}

function formatRoleLine(user) {
    const bio = user.bio || "Developer";
    if (!user.company) return bio;

    const company = user.company.trim();
    const companyLabel = company.startsWith("@") ? company : `@${company}`;
    return `${bio} ${GREEN}${companyLabel}${RESET}`;
}

function normalizeUrl(url) {
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

function formatLink(url) {
    return `${BLUE}${url}${RESET}`;
}

function renderStats(rows) {
    const labelWidth = Math.max(...rows.flatMap((row) => [
        displayWidth(row[0]),
        displayWidth(row[2]),
    ]));
    const valueWidth = Math.max(...rows.flatMap((row) => [
        displayWidth(String(row[1])),
        displayWidth(String(row[3])),
    ]));
    const leftColumnWidth = labelWidth + 3 + valueWidth;

    return rows.map(([leftLabel, leftValue, rightLabel, rightValue]) => {
        const leftColumn =
            `${padEndVisible(leftLabel, labelWidth)}   ` +
            `${YELLOW}${padEndVisible(String(leftValue), valueWidth)}${RESET}`;
        const rightColumn =
            `${padEndVisible(rightLabel, labelWidth)}   ` +
            `${YELLOW}${padEndVisible(String(rightValue), valueWidth)}${RESET}`;

        return `  ${padEndVisible(leftColumn, leftColumnWidth)}      ${rightColumn}`;
    });
}

function renderTimeline(totalByYear, peakYear, contentWidth) {
    const maxTotal = Math.max(...totalByYear.map((item) => item.total));
    const valueWidth = Math.max(
        ...totalByYear.map((item) => String(item.total).length),
    );
    const barWidth = Math.max(12, contentWidth - valueWidth - 16);
    const lines = [];

    for (const item of totalByYear) {
        const size = maxTotal
            ? Math.max(1, Math.round((item.total / maxTotal) * barWidth))
            : 1;
        const bar = `${GREEN}${"━".repeat(size)}${RESET}`;
        const marker =
            peakYear && item.year === peakYear.year
                ? ` ${YELLOW}🔥${RESET}`
                : "";
        const value = padStartVisible(String(item.total), valueWidth);

        lines.push(
            `${item.year}    ${bar}  ${YELLOW}${value}${RESET}${marker}`,
        );
    }

    return lines;
}

function getGitHubAge(date) {
    const now = new Date();
    let years = now.getFullYear() - date.getFullYear();
    const hasHadAnniversary =
        now.getMonth() > date.getMonth() ||
        (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());

    if (!hasHadAnniversary) years -= 1;
    return Math.max(0, years);
}

function addLines(target, source) {
    for (const line of source) target.push(line);
}

function separator() {
    return { separator: true };
}

function printBox(lines, width = MIN_CONTENT_WIDTH) {
    const border = "─".repeat(width + 2);

    console.log(`╭${border}╮`);

    for (const line of lines) {
        if (line && line.separator) {
            console.log(`├${border}┤`);
            continue;
        }

        const text = line || "";
        const padding = " ".repeat(Math.max(0, width - displayWidth(text)));
        console.log(`│ ${text}${padding} │`);
    }

    console.log(`╰${border}╯`);
}

function getTerminalContentWidth() {
    const columns = Number(process.stdout.columns) || 0;
    if (!columns) return 0;

    return Math.max(20, columns - BOX_HORIZONTAL_CHROME);
}

function getContentWidth(login, terminalContentWidth) {
    const naturalWidth = Math.max(MIN_CONTENT_WIDTH, getBannerWidth(login));

    if (!terminalContentWidth) return naturalWidth;
    return Math.min(naturalWidth, terminalContentWidth);
}

function padEndVisible(input, width) {
    const text = String(input);
    return `${text}${" ".repeat(Math.max(0, width - displayWidth(text)))}`;
}

function padStartVisible(input, width) {
    const text = String(input);
    return `${" ".repeat(Math.max(0, width - displayWidth(text)))}${text}`;
}

function displayWidth(input) {
    const text = stripAnsi(input).replace(/\uFE0F/g, "");
    let width = 0;
    const segments =
        typeof Intl !== "undefined" && Intl.Segmenter
            ? Array.from(
                  new Intl.Segmenter().segment(text),
                  (item) => item.segment,
              )
            : Array.from(text);

    for (const segment of segments) {
        if (isEmoji(segment)) {
            width += 2;
            continue;
        }

        for (const char of Array.from(segment)) {
            const code = char.codePointAt(0);

            if (code <= 0x1f || (code >= 0x7f && code <= 0x9f)) continue;
            if (
                code === 0x200d ||
                isVariationSelector(code) ||
                isCombining(code)
            )
                continue;
            width += isWide(code) ? 2 : 1;
        }
    }

    return width;
}

function stripAnsi(input) {
    return String(input).replace(ANSI_PATTERN, "");
}

function isEmoji(segment) {
    return /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(segment);
}

function isCombining(code) {
    return (
        (code >= 0x300 && code <= 0x36f) ||
        (code >= 0x1ab0 && code <= 0x1aff) ||
        (code >= 0x1dc0 && code <= 0x1dff) ||
        (code >= 0x20d0 && code <= 0x20ff) ||
        (code >= 0xfe20 && code <= 0xfe2f)
    );
}

function isVariationSelector(code) {
    return (
        (code >= 0xfe00 && code <= 0xfe0f) ||
        (code >= 0xe0100 && code <= 0xe01ef)
    );
}

function isWide(code) {
    return (
        code >= 0x1100 &&
        (code <= 0x115f ||
            code === 0x2329 ||
            code === 0x232a ||
            (code >= 0x2e80 && code <= 0xa4cf && code !== 0x303f) ||
            (code >= 0xac00 && code <= 0xd7a3) ||
            (code >= 0xf900 && code <= 0xfaff) ||
            (code >= 0xfe10 && code <= 0xfe19) ||
            (code >= 0xfe30 && code <= 0xfe6f) ||
            (code >= 0xff00 && code <= 0xff60) ||
            (code >= 0xffe0 && code <= 0xffe6) ||
            (code >= 0x1f300 && code <= 0x1f64f) ||
            (code >= 0x1f900 && code <= 0x1f9ff))
    );
}
