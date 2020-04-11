


export function getStoreInfo(idStore) {
    return new Promise((resolve, reject) => {
        resolve( {
            id: 1,
            name: 'Bona Fruita Sants',
            description: '',
            postal_address: 'Carretera de sants, 258, 08028 Barcelona',
            website: 'https://www.facebook.com/bonafruita/',
            phone_number: '933 39 91 18',
            tags : ['Obert ara', 'Per recollir', 'A domicili'],
            image: '',
            openning_hours: {
                'monday': '9:00 - 14:00, 16:00 - 20:00',
                'tuesday': '9:00 - 14:00, 16:00 - 20:00',
                'wednesday': '9:00 - 14:00, 16:00 - 20:00',
                'thursday': '9:00 - 14:00, 16:00 - 20:00',
                'friday': '9:00 - 14:00, 16:00 - 20:00',
                'saturday': '9:00 - 14:00',
                'sunday': 'Tancat'
            },
            stars: 4.5,
            products: {
                'Verdura': [
                    {   
                        'id': 4,
                        'name': 'Pebrot',
                        'description': 'Origen: Valencia',
                        'unit': 'kg',
                        'price_unit': '2'
                    },
                    {
                        'id': 3,
                        'name': 'Tomàquet',
                        'description': 'Origen: Valencia',
                        'unit': 'kg',
                        'price_unit': '3'
                    }
                ],
                'Fruita': [
                    {
                        'id': 2,
                        'name': 'Plàtan',
                        'unit': 'kg',
                        'price_unit': '2'
                    },
                    {
                        'id': 1,
                        'name': 'Kiwi',
                        'description': 'Origen: Valencia',
                        'unit': 'kg',
                        'price_unit': '3'
                    }
                ]
            }
        });
    });
}