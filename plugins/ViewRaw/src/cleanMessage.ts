// settings wip
const sortObject = <T extends object>(obj: T): T => {
    return Object.fromEntries(Object.entries(obj).sort(([k1], [k2]) => k1.localeCompare(k2))) as T
}

export const cleanMessage = (message) => {
    const clone = JSON.parse(JSON.stringify(message))
    for (const key in clone.author) {
        switch (key) {
            case "email":
            case "phone":
            case "mfaEnabled":
            case "hasBouncedEmail":
                delete clone.author[key]
        }
    }

    return clone
}