export const tryParseJson = <T>(jsonString: string) : T | null => {
    try {
        return JSON.parse(jsonString) as T
    }
    catch {
        return null
    }
}