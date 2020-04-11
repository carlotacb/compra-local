export function getCurrentOrders(idStore) {
    return new Promise((resolve, reject) => {
        resolve(
            [
                {
                    "delivery": true,
                    "helper_needed": false,
                    "local_name": "Bona fruita busquets",
                    "step": 3,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product_name": "Pebrots",
                            "quantity": "2kg",
                            "total_price": 5
                        },
                        {
                            "product_name": "Maduixots del maresme",
                            "quantity": "4 unitats",
                            "total_price": 2.50
                        }
                    ]
                },
                {
                    "delivery": false,
                    "helper_needed": true,
                    "local_name": "Bona fruita busquets",
                    "step": 4,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product_name": "Pebrots",
                            "quantity": "2kg",
                            "total_price": 5
                        },
                        {
                            "product_name": "Maduixots del maresme",
                            "quantity": "4 unitats",
                            "total_price": 2.50
                        }
                    ],
                    "assigned_helper": true,
                    "helper": {
                        "name": "Martí Marçal",
                        "phone_number": 633049576,
                        "payment": "Pagament Anticipat"
                    }
                },
                {
                    "delivery": false,
                    "helper_needed": true,
                    "local_name": "Bona fruita busquets",
                    "step": 3,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product_name": "Pebrots",
                            "quantity": "2kg",
                            "total_price": 5
                        },
                        {
                            "product_name": "Maduixots del maresme",
                            "quantity": "4 unitats",
                            "total_price": 2.5
                        }
                    ],
                    "assigned_helper": true,
                    "helper": {
                        "name": "Martí Marçal",
                        "phone_number": 633049576,
                        "payment": "Pagament Anticipat"
                    }
                },
                {
                    "delivery": false,
                    "helper_needed": true,
                    "local_name": "Bona fruita busquets",
                    "step": 1,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product_name": "Pebrots",
                            "quantity": "2kg",
                            "total_price": 5
                        },
                        {
                            "product_name": "Maduixots del maresme",
                            "quantity": "4 unitats",
                            "total_price": 2.5
                        }
                    ],
                    "assigned_helper": false
                },
                {
                    "delivery": false,
                    "helper_needed": false,
                    "local_name": "Bona fruita busquets",
                    "step": 1,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product_name": "Pebrots",
                            "quantity": "2kg",
                            "total_price": 5
                        },
                        {
                            "product_name": "Maduixots del maresme",
                            "quantity": "4 unitats",
                            "total_price": 2.5
                        }
                    ]
                },
                {
                    "delivery": false,
                    "helper_needed": false,
                    "local_name": "Bona fruita busquets",
                    "step": 1,
                    "total": 53.20,
                    "ticket": [
                        {
                            "product_name": "Pebrots",
                            "quantity": "2kg",
                            "total_price": 5
                        },
                        {
                            "product_name": "Maduixots del maresme",
                            "quantity": "4 unitats",
                            "total_price": 2.5
                        }
                    ]
                },
            ]
        );
    });
}