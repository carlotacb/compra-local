export function getGivenValorations(idStore) {
    return new Promise((resolve, reject) => {
        resolve(
            [
                {
                    "punctuation": 2,
                    "writer": "Andrea",
                    "comment": "This is a test"
                },
                {
                    "punctuation": 4,
                    "writer": "Mauri",
                    "comment": "This is a test"
                },
                {
                    "punctuation": 1,
                    "writer": "Marina",
                    "comment": "This is a test"
                }
            ]
        )
    });
}