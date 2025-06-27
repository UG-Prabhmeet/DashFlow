export function highlightMentions(text) {
    const mentionRegex = /@([a-zA-Z0-9_]+)/g;
    const parts = text.split(mentionRegex);

    return parts.map((part, idx) =>
        idx % 2 === 1 ? (
            <span key={idx} className="text-blue-600 font-medium">
                @{part}
            </span>
        ) : (
            part
        )
    );
}
