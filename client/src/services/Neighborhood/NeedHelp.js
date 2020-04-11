export function getNeedHelp(idStore) {
    return new Promise((resolve, reject) => {
        resolve([
            {
                "id": 1,
                "order_list": [
                {
                    "id": 1,
                    "name": "Bona Fruita Busquets",
                    "postal_adress": "Carretera de sants, 258, 08028 Barcelona",
                },
                {
                    "id": 2,
                    "name": "Ferreteria paco",
                    "postal_adress": "Carretera de sants, 230, 08028 Barcelona",
                }
                ],
                "user": {
                    "id": 1,
                    "name": "Albert Suarez",
                    "postal_adress": "Carrer de Sants, 337, 5-2",
                    "type": "CLIENT"
                }
            },
            {
                "id": 2,
                "order_list": [
                {
                    "id": 1,
                    "name": "Bona Fruita Busquets",
                    "postal_adress": "Carretera de sants, 258, 08028 Barcelona",
                },
                {
                    "id": 2,
                    "name": "Ferreteria paco",
                    "postal_adress": "Carretera de sants, 230, 08028 Barcelona",
                }
                ],
                "user": {
                    "id": 1,
                    "name": "Albert Suarez",
                    "postal_adress": "Carrer de Sants, 337, 5-2",
                    "type": "CLIENT"
                }
            }
        ]);
    });
}