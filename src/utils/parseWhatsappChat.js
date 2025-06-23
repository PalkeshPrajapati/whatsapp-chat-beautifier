export function parseWhatsappChat(rawText) {
    const allMessages = [];
    const people = new Set();

    const lines = rawText.split("\n");
    const messageRegex =
        /^(\d{2}\/\d{2}\/\d{4}), (\d{1,2}:\d{2}(?:\u202f)?(?:am|pm)) - ([^:]+): (.+)$/i;
    const systemMessageRegex =
        /^(\d{2}\/\d{2}\/\d{4}), (\d{1,2}:\d{2}(?:\u202f)?(?:am|pm)) - (.+)$/i;

    let currentMessage = null;

    for (const line of lines) {
        const messageMatch = line.match(messageRegex);
        if (messageMatch) {
            const [, date, time, sender, content] = messageMatch;
            currentMessage = { date, time, sender, content };
            allMessages.push(currentMessage);
            people.add(sender);
        } else {
            const systemMatch = line.match(systemMessageRegex);
            if (systemMatch) {
                const [, date, time, content] = systemMatch;
                allMessages.push({ date, time, sender: "System_*!#0)^%", content });
                currentMessage = null;
            } else if (currentMessage) {
                currentMessage.content += "\n" + line;
            }
        }
    }

    return { messages: allMessages, participants: [...people] };
}
