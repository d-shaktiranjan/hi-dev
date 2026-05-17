# hi-dev

> 🧑‍💻 A Node.js CLI tool to display a GitHub developer card with profile details and contribution activity directly in the terminal using npx.

## ✨ Features

- Fetches public GitHub profile details (name, bio, location, repos, followers, etc.)
- Fetches contribution activity from `github-contributions-api.jogruber.de`
- Displays stats and a yearly contribution timeline
- Adds quick npm package link and a command others can run to create their own card
- No setup required — just use with `npx`

## 🚀 Usage

Run the following command directly in your terminal

```bash
npx hi-dev <github_username>
```

Example

```bash
npx hi-dev d-shaktiranjan
```

You can also mention `@` before the username, but it's completely optional.

```bash
npx hi-dev @d-shaktiranjan
```

## 📦 Installation (Optional)

If you'd like to install it globally

```bash
npm install -g hi-dev
```

Then use it like this

```bash
hi-dev <github_username>
```

## 📸 Output Preview

![image](https://github.com/user-attachments/assets/cc4949ae-b43a-4359-bd59-082a1a7d2c27)
