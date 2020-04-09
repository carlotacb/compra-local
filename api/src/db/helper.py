import sqlalchemy as db


def get_sequence(table_name):
    sequence_name = f'{table_name}_id_seq'
    return db.Sequence(
        sequence_name,
        start=1,
        increment=1,
        minvalue=1,
        maxvalue=9223372036854775807,
        cache=1
    )
