export function getCompletedOrders(idStore) {
    return new Promise((resolve, reject) => {
        resolve([
            {
                "complition_date": Date(20/9/2020),
                "local_name": "Bona fruita busquets",
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
            }
        ]);
    });
}