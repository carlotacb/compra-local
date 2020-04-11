export function ProcesHelper(idStore) {
    return new Promise((resolve, reject) => {
        resolve([ {
            "helper_list": [
                {
                  "id": 2,
                  "order_list": [
                    {
                      "id": 1,
                      "name": "Bona Fruita Busquets",
                      "postal_adress": "Carretera de sants, 258, 08028 Barcelona",
                      "total": 53.60,
                      "status": "En procès", 
                    },
                    {
                        "id": 2,
                        "name": "Ferreteria paco",
                        "postal_adress": "Carretera de sants, 230, 08028 Barcelona",
                        "total": 15.20,
                        "status": "En procès", 
                    }
                  ],
                  "total": 68.80,
                  "user": {
                    "email_address": "hi@albert.dev",
                    "id": 1,
                    "name": "Albert Suarez",
                    "image": "algomoltmoltmoltmoltllarg",
                    "phone_number": "666 555 444",
                    "type": "CLIENT"
                  }
                }
              ]
            }
        ]);
    });
}