const colors = [
    "#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1",
    "#5f27cd", "#ff9ff3", "#00d2d3", "#54a0ff",
    "#c8d6e5", "#ffb142", "#ff793f", "#7efff5",
    "#f368e0", "#10ac84", "#00a8ff", "#eccc68",
    "#ff4d4d", "#ffbb33", "#00c851", "#33b5e5",
    "#aa66cc", "#2e86de", "#f8c291", "#6c5ce7",
    "#fd79a8", "#a29bfe", "#ffeaa7", "#fab1a0",
    "#55efc4", "#ffeaa7", "#ff7675", "#81ecec",
    "#74b9ff", "#a3cb38", "#9980FA", "#C4E538"
];

export function getColorForUser(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
}
