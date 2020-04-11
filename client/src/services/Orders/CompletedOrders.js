export function getCompletedOrders(idStore) {
    return new Promise((resolve, reject) => {
        resolve([
            {
                "complition_date": "10/04/2020",
                "local_name": "Bona fruita busquets",
                "total": 7.5,
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
                "complition_date": "16/03/2020",
                "local_name": "Bona fruita sants",
                "total": 3.5,
                "ticket": [
                    {
                        "product_name": "Patates noves",
                        "quantity": "300g",
                        "total_price": 2
                    },
                    {
                        "product_name": "Plàtans de canaries",
                        "quantity": "100g",
                        "total_price": 1.5
                    }
                ]
            },
            {
                "complition_date": "25/03/2020",
                "local_name": "Farmacia Valentines",
                "total": 115,
                "ticket": [
                    {
                        "product_name": "Paracetamol 1g",
                        "quantity": "2 caixes",
                        "total_price": 15
                    },
                    {
                        "product_name": "Mascareta",
                        "quantity": "1",
                        "total_price": 100
                    }
                ]
            }
        ]);
    });
}