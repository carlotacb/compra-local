export function getRecivedValorations(idStore) {
    return new Promise((resolve, reject) => {
        resolve(
            [
                {
                    "punctuation": 2,
                    "writer": "Carlota",
                    "comment": "This is a test"
                },
                {
                    "punctuation": 4,
                    "writer": "Albert",
                    "comment": "This is a test"
                },
                {
                    "punctuation": 1,
                    "writer": "Elena",
                    "comment": "This is a test"
                },
                {
                    "punctuation": 5,
                    "writer": "Andreu",
                    "comment": "This is a test"
                }
            ]
        )
    });
}