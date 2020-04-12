import enum


class OrderType(enum.Enum):

    DELIVER = 'DELIVER'
    PICK_UP = 'PICK_UP'
    HELPER_NEEDED = 'HELPER_NEEDED'
