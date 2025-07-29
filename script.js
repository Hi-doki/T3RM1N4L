// Thank you for using my template! It's kind of my first time making one so uhh yaaa, enjoy!! :3
// Also, there might be some issues with the welcome message. It works 50% of the time, if someone could open a pull request I'd gladly appreciate it!
const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('command-input');
const themeSwitcher = document.getElementById('theme-switcher');

let isLightTheme = false;

// Commands and their output.
const commands = {
    help: `
Available commands:
  <span class="command-echo">about</span>
  <span class="command-echo">projects</span>
  <span class="command-echo">contact</span
  <span class="command-echo">clear</span>
  <span class="command-echo">theme</span>
  <span class="command-echo">help</span>
    `,
    about: `
Hiii! I'm Michii, a full-stack developer that has created a plethora of different projects ranging from social media websites to low level software to modify your system.
I have been coding for around 6 years by now (since 2019, but started my first actual project in 2020 in c#).
    `,
    projects: `
Here are some of my projects:

<ul class="projects">
    <li>
        <p class="project-title">Echo</p>
        <p>A Twitter-like social media site focused on customizablity and usability. (Currently not being updated)</p>
        <a href="https://echo.nekos.ca" target="_blank">[Website]</a>
    </li>
    <li>
        <p class="project-title">senkotheme</p>
        <p>A theme for many programs based on the colors of Senko-San. Color Scheme created by me!</p>
        <a href="https://www.reddit.com/r/desktops/comments/1m2fzb5/a_silly_theme_ive_been_working_on_recently/" target="_blank">[Original Reddit Thread]</a> <a href="https://github.com/Hi-doki/senkotheme" target="_blank">[GitHub]</a>
    </li>
    <li>
        <p class="project-title">PiPiOS</p>
        <p>A modular fake simulation of an "Operating System"/Kernel in python. (My first python project)</p>
        <a href="https://github.com/Hi-doki/PiPiOS" target="_blank">[GitHub]</a>
    </li>
</ul>
    `,
    contact: `
You can reach me via email or find me on social media:

Email:   <a href="mailto:kora@nekos.ca">kora@nekos.ca</a>
GitHub:  <a href="https://github.com/hi-doki" target="_blank">github.com/hidoki</a>
    `,
};

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        isLightTheme = true;
        localStorage.setItem('portfolioTheme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        isLightTheme = false;
        localStorage.setItem('portfolioTheme', 'dark');
    }
}

function toggleTheme() {
    applyTheme(isLightTheme ? 'dark' : 'light');
}

function handleThemeCommand(args) {
    const theme = args[0];
    if (theme === 'light' || theme === 'dark') {
        applyTheme(theme);
        print(`Theme set to ${theme}.`);
    } else {
        print(`Usage: theme [light|dark]`);
    }
}

function printWelcomeMessage() {
    const welcome = `
Welcome to John Doe's portfolio!
Type 'help' to see a list of available commands.
    `;
    print(welcome);
}

function print(message) {
    const p = document.createElement('div');
    p.innerHTML = message;
    output.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(e) {
    if (e.key === 'Enter') {
        const fullCommand = input.value.trim().toLowerCase();
        input.value = '';

        if (fullCommand) {
            print(`<span class="prompt">&gt;</span> <span class="command-echo">${fullCommand}</span>`);
            const [command, ...args] = fullCommand.split(/\s+/);

            if (command === 'clear') {
                output.innerHTML = '';
            } else if (command === 'theme') {
                handleThemeCommand(args);
            } else if (commands[command]) {
                print(commands[command]);
            } else {
                print(`Command not found: ${command}. Type 'help' for a list of commands.`);
            }
        }
    }
}

// Focus the input when the terminal is clicked
terminal.addEventListener('click', () => {
    input.focus();
});

// Handle keydown events for commands
input.addEventListener('keydown', handleCommand);

// Handle theme switcher click
themeSwitcher.addEventListener('click', toggleTheme);

// Initial setup
const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
applyTheme(savedTheme);
printWelcomeMessage();
input.focus();
