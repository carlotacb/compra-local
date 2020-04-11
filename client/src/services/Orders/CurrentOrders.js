export function getCurrentOrders(idStore) {
    return new Promise((resolve, reject) => {
        resolve(
            [
                {
                    "delivery": false,
                    "helper": false,
                    "shop": "Bona fruita busquets",
                    "step": 1,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product": "Pebrots 2kg",
                            "price": 5
                        },
                        {
                            "product": "Maduixots del maresme",
                            "price": 2.5
                        }
                    ]
                },
                {
                    "delivery": false,
                    "helper": false,
                    "shop": "Bona fruita busquets",
                    "step": 1,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product": "Pebrots 2kg",
                            "price": 5
                        },
                        {
                            "product": "Maduixots del maresme",
                            "price": 2.5
                        }
                    ]
                },
                {
                    "delivery": false,
                    "helper": false,
                    "shop": "Bona fruita busquets",
                    "step": 1,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product": "Pebrots 2kg",
                            "price": 5
                        },
                        {
                            "product": "Maduixots del maresme",
                            "price": 2.5
                        }
                    ]
                },
            ]
        );
    });
}